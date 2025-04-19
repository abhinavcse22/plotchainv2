import React, { useState, useEffect } from "react";
import LandContract from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActions, Box, Container } from '@mui/material';
import { Link } from "react-router-dom";
import backgroundImage from "../Assets/imgs/16623.jpg";

// Component for buyer dashboard
const BuyerRegistration = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [lands, setLands] = useState([]);
  const [sellersCount, setSellersCount] = useState(0);
  const [ownedLands, setOwnedLands] = useState([]);
  const [buyerDetails, setBuyerDetails] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3Instance = await getWeb3();
        const accounts = await web3Instance.eth.getAccounts();
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = LandContract.networks[networkId];
        const contractInstance = new web3Instance.eth.Contract(
          LandContract.abi,
          deployedNetwork && deployedNetwork.address
        );

        setWeb3(web3Instance);
        setAccounts(accounts);
        setContract(contractInstance);

        const details = await contractInstance.methods
          .getBuyerDetails(accounts[1])
          .call();
        setBuyerDetails({
          name: details[0],
          city: details[1],
          email: details[2],
          age: details[3].toString(),
          HKID: details[4],
        });

        const sellersCount = await contractInstance.methods
          .getSellersCount()
          .call();
        setSellersCount(sellersCount);

        const landsCount = await contractInstance.methods
          .getLandsCount()
          .call();
        const _lands = [];
        for (let i = 1; i <= parseInt(landsCount); i++) {
          let land = await contractInstance.methods.getLandDetails(i).call();
          let requested = await contractInstance.methods.isRequested(i).call();
          let owner = await contractInstance.methods.getLandOwner(i).call();
          let approved = await contractInstance.methods.isApproved(i).call();

          _lands.push({
            id: land[0],
            landAddress: land[1],
            area: land[2],
            city: land[3],
            district: land[4],
            country: land[5],
            landPrice: land[6],
            propertyPID: land[7],
            owner: owner,
            requested: requested,
            approved: approved,
          });
        }
        setLands(_lands);

        const owned = _lands.filter((land) => land.owner === accounts[1]);
        setOwnedLands(owned);
      } catch (error) {
        alert("Failed to load web3, accounts, or contract. Check console for details.");
        console.error(error);
      }
    };

    initWeb3();
  }, []);

  return (
    <Container maxWidth={false}
      style={{
        background: "#ffebb2",
        width: "100vw",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        textAlign: "center",
        backgroundImage: `url(${backgroundImage})`,
      }}>
      {/* Main Box for Dashboard Title */}
      <Box style={{ width: "50%", margin: "auto" }}>
        <Typography variant="h3" component="h2" style={{
          color: "#000",
          paddingTop: "15%",
          paddingBottom: "5%",
          fontWeight: 'bold',
        }}>
          Buyer Dashboard
        </Typography>
        <Typography variant="h6" component="h2" style={{ color: "#000" }}>
          Welcome, {accounts[1]}
        </Typography>
      </Box>

      {/* Card Layout for Dashboard Features */}
      <Box style={{ display: "flex", flexDirection: "row", paddingTop: "7%", paddingLeft: "2%" }}>
        {/* Profile Card */}
        <Card style={{
          margin: "20px",
          width: "600px",
          height: "250px",  // Reduced height
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Glass effect background
          backdropFilter: "blur(16px)", // Glass blur effect
          boxShadow: "0px 2px 20px rgba(10, 10, 10, 0.1)", // Box shadow
          borderRadius: "20px",
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Profile
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link}
              variant="contained"
              color="primary"
              to="/buyer-profile"
              style={{ marginBottom: "20px", margin: "auto" }}>
              View Profile
            </Button>
          </CardActions>
        </Card>

        {/* Owned Lands Card */}
        <Card style={{
          margin: "20px",
          width: "600px",
          height: "250px",  // Reduced height
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Glass effect background
          backdropFilter: "blur(16px)", // Glass blur effect
          boxShadow: "0px 2px 20px rgba(10, 10, 10, 0.1)", // Box shadow
          borderRadius: "20px",
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Owned Lands
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link}
              variant="contained"
              color="primary"
              to="/buyer-owned-lands"
              style={{ marginBottom: "20px", margin: "auto" }}>
              View Owned Lands
            </Button>
          </CardActions>
        </Card>

        {/* Available Lands Card */}
        <Card style={{
          margin: "20px",
          width: "600px",
          height: "250px",  // Reduced height
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Glass effect background
          backdropFilter: "blur(16px)", // Glass blur effect
          boxShadow: "0px 2px 20px rgba(10, 10, 10, 0.1)", // Box shadow
          borderRadius: "20px",
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Available Lands
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link}
              variant="contained"
              color="primary"
              to="/buyer-available-lands"
              style={{ marginBottom: "20px", margin: "auto" }}>
              View Available Lands
            </Button>
          </CardActions>
        </Card>

        {/* Land Requests Card */}
        <Card style={{
          margin: "20px",
          width: "600px",
          height: "250px",  // Reduced height
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Glass effect background
          backdropFilter: "blur(16px)", // Glass blur effect
          boxShadow: "0px 2px 20px rgba(10, 10, 10, 0.1)", // Box shadow
          borderRadius: "20px",
        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              View Land Requests
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link}
              variant="contained"
              color="primary"
              to="/buyer-land-requests"
              style={{ marginBottom: "20px", margin: "auto" }}>
              View Land Requests
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default BuyerRegistration;
