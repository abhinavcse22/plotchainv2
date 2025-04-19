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

const SellerDashboard = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [buyersCount, setBuyersCount] = useState(0);
  const [sellerDetails, setSellerDetails] = useState(null);
  const [landRequests, setLandRequests] = useState([]);

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
          .getSellerDetails(accounts[2])
          .call();
        setSellerDetails({
          name: details[0],
          age: details[1].toString(),
          HKID: details[2],
        });

        const buyerscount = await contractInstance.methods
          .getBuyersCount()
          .call();
        setBuyersCount(buyerscount);

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

        const ownedLands = _lands.filter((land) => land.owner === accounts[2]);
        setLandRequests(ownedLands);
      } catch (error) {
        alert(
          "Failed to load web3, accounts, or contract. Check console for details."
        );
        console.error(error);
      }
    };

    initWeb3();
  }, []);

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        width: "100vw",
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        textAlign: "center",
        paddingTop: "10%",
        color: "black", // Set text color to black
      }}
    >
      <Box style={{ width: "70%", margin: "auto" }}>
        <Typography
          variant="h3"
          component="h2"
          style={{ color: "black", fontWeight: "bold", paddingBottom: "5%" }}
        >
          Seller Dashboard
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          style={{ color: "black", fontWeight: "bold" }}
        >
          Welcome, {accounts[2]}
        </Typography>
      </Box>

      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingTop: "7%",
          paddingLeft: "2%",
        }}
      >
        {/* Profile Card */}
        <Card
          style={{
            margin: "20px",
            width: "300px",
            height: "250px", // Reduced height
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(16px)", // Glass effect
            borderRadius: "15px",
            boxShadow: "0px 2px 20px rgba(10, 10, 10, 0.1)",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Profile
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to="/seller-profile"
              style={{
                marginBottom: "20px",
                margin: "auto",
              }}
            >
              View Profile
            </Button>
          </CardActions>
        </Card>

        {/* Owned Lands Card */}
        <Card
          style={{
            margin: "20px",
            width: "300px",
            height: "250px", // Reduced height
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(16px)", // Glass effect
            borderRadius: "15px",
            boxShadow: "0px 2px 20px rgba(10, 10, 10, 0.1)",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Owned Lands
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to="/seller-owned-lands"
              style={{
                marginBottom: "20px",
                margin: "auto",
              }}
            >
              View Owned Lands
            </Button>
          </CardActions>
        </Card>

        {/* Add Lands Card */}
        <Card
          style={{
            margin: "20px",
            width: "300px",
            height: "250px", // Reduced height
            background: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(16px)", // Glass effect
            borderRadius: "15px",
            boxShadow: "0px 2px 20px rgba(10, 10, 10, 0.1)",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Add Lands
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to="/seller-land-add"
              style={{
                marginBottom: "20px",
                margin: "auto",
              }}
            >
              Add Lands
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default SellerDashboard;
