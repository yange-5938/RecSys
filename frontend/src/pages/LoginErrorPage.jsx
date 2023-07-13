import { Alert, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginErrorPage() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}>
      <div
        style={{
          width: "50%",
        }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Alert severity="error">Please login first!</Alert>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
