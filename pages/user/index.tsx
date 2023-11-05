// pages/user/profile.tsx
import React, { useEffect, useState } from "react";
//hooks
import { useUserContext } from "../../src/contexts/UserContext";
import { useUserMutations } from "../../src/hooks/mutations/useUserMutations";
// utils & icons
import {
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  ListItemSecondaryAction,
  Switch,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import EnhancedEncryptionIcon from "@material-ui/icons/EnhancedEncryption";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import PermIdentity from "@material-ui/icons/PermIdentity";
import EmailIcon from "@material-ui/icons/Email";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SaveIcon from "@material-ui/icons/Save";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useUserQueries } from "../../src/hooks/queries/useUserQueries";

const UserProfile = () => {
  const { user } = useUserContext();
  const { fetchUserInfo, loading } = useUserQueries();
  const {
    toggle2FA,
    updateSocial,
    loading: loadingMutation,
  } = useUserMutations();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    user ? user.twoFactorEnabled || false : false
  );

  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  // State to track if any changes have been made to the input fields
  const [changesMade, setChangesMade] = useState(false);

  // Initial state values for input fields
  const [initialFacebookLink, setInitialFacebookLink] = useState("");
  const [initialInstagramLink, setInitialInstagramLink] = useState("");
  const [initialYoutubeLink, setInitialYoutubeLink] = useState("");

  // set inputs fields as controlled components
  useEffect(() => {
    if (user) {
      setFacebookLink(user.facebook || "");
      setInstagramLink(user.instagram || "");
      setYoutubeLink(user.youtube || "");
      console.log("fb link changed", user);
    }
  }, [user]);

  useEffect(() => {
    // Set initial input field values
    if (user) {
      setInitialFacebookLink(user.facebook || "");
      setInitialInstagramLink(user.instagram || "");
      setInitialYoutubeLink(user.youtube || "");
      console.log("initial called");
    }
  }, [user]); // This effect runs only once when the component mounts or when the user changes

  // Check if there have been changes to the input fields
  useEffect(() => {
    setChangesMade(
      initialFacebookLink !== facebookLink ||
        initialInstagramLink !== instagramLink ||
        initialYoutubeLink !== youtubeLink
    );
  }, [
    facebookLink,
    instagramLink,
    youtubeLink,
    initialFacebookLink,
    initialInstagramLink,
    initialYoutubeLink,
  ]);

  const handleTwoFactorSwitch = async () => {
    const newTwoFactorStatus = !twoFactorEnabled;

    try {
      const res = await toggle2FA(newTwoFactorStatus);
      if (res) {
        setTwoFactorEnabled(newTwoFactorStatus);
        await fetchUserInfo();
      } else {
        setTwoFactorEnabled(!newTwoFactorStatus);
        // If the request fails, set the switch back to its previous state.
        console.error("Failed to toggle 2FA");
      }
    } catch (error) {
      console.error("Error toggling 2FA:", error);
      // If there is an error, set the switch back to its previous state.
      setTwoFactorEnabled(!newTwoFactorStatus);
    }
  };

  const handleSave = async () => {
    const facebookFlag = initialFacebookLink !== facebookLink;
    const instagramFlag = initialInstagramLink !== instagramLink;
    const youtubeFlag = initialYoutubeLink !== youtubeLink;

    try {
      if (facebookFlag) {
        await updateSocial(facebookLink, "facebook");
      }
      if (instagramFlag) {
        await updateSocial(instagramLink, "instagram");
      }
      if (youtubeFlag) {
        await updateSocial(youtubeLink, "youtube");
      }
    } finally {
      await fetchUserInfo();
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const VerifiedChip: React.FC<{ isVerified: boolean }> = ({ isVerified }) => (
    <Chip
      icon={isVerified ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
      label={isVerified ? "Verified" : "Not Verified"}
      variant="outlined"
      size="small"
      className={isVerified ? "!bg-green-500" : "!bg-red-500"}
    />
  );

  return (
    <div className="flex justify-center mt-10">
      <Card className="w-96">
        <CardContent>
          <Typography
            variant="h5"
            gutterBottom
            className="flex items-center justify-between"
          >
            <div>
              <AccountBoxIcon className="mr-1" />
              User Profile
            </div>
            <Button
              variant="contained"
              color="secondary"
              disabled={!changesMade}
              startIcon={<SaveIcon />}
              endIcon={
                (loading || loadingMutation) && <CircularProgress size={24} />
              }
              onClick={handleSave}
              className="mt-4 w-[12rem]"
            >
              Save Changes
            </Button>
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="Email" secondary={user.email} />
              <VerifiedChip isVerified={user.emailVerified} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EnhancedEncryptionIcon />
              </ListItemIcon>
              <ListItemText primary="Two Factor" />
              <ListItemSecondaryAction>
                <Switch
                  edge="start"
                  size="medium"
                  onChange={handleTwoFactorSwitch}
                  checked={twoFactorEnabled}
                  checkedIcon={
                    <EnhancedEncryptionIcon style={{ fontSize: 16 }} />
                  }
                  icon={
                    <CloseIcon className="text-red-500 rounded-full border !text-[20px]" />
                  }
                  className="rounded-3xl !w-[4.5rem]"
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PermIdentity />
              </ListItemIcon>
              <ListItemText
                primary="Role"
                secondary={user.role}
                className="capitalize"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText
                primary="Balance"
                secondary={`$${user.balance.toFixed(2)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FacebookIcon />
              </ListItemIcon>
              <TextField
                label="Facebook"
                variant="outlined"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InstagramIcon />
              </ListItemIcon>
              <TextField
                label="Instagram"
                variant="outlined"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
                fullWidth
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <YouTubeIcon />
              </ListItemIcon>
              <TextField
                label="YouTube"
                variant="outlined"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                fullWidth
              />
            </ListItem>
          </List>
          <Divider className="my-2" />
          <Typography variant="h6" gutterBottom>
            Transactions
          </Typography>
          <List dense>
            {user.transactions && user.transactions.length > 0 ? (
              user.transactions.map((transaction, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={transaction.reason}
                    secondary={`$${transaction.creditAmount.toFixed(2)}`}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No transactions available" />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
