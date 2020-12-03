import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import getBounty from "../../actions/getBounty";
import ExtensionOutlinedIcon from "@material-ui/icons/ExtensionOutlined";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PublishIcon from "@material-ui/icons/Publish";
import ReactMarkdown from "react-markdown";
import Hidden from "@material-ui/core/Hidden";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LinkIcon from "@material-ui/icons/Link";
import AttachmentIcon from "@material-ui/icons/Attachment";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./markdown.scss";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    color: "#ffffff",
    fontSize: 25,
    marginTop: 0,
    marginBottom: ".5rem",
    fontWeight: 400,
  },
  chip: {
    height: 22,
    marginBottom: 12,
    color: "#ffffff",
    borderColor: "#e6e7ea",
  },
  paper: {
    maxWidth: "100%",
    width: 912,
    padding: "1rem",
    marginBottom: "4em",
  },
  payoutBalance: {
    padding: "1.5rem",
    borderRadius: 4,
    backgroundColor: "#5843b1",
    maxWidth: 182,
  },
  payoutLabel: {
    color: "#ffffff",
    fontSize: 12,
    margin: 0,
  },
  payoutFade: {
    margin: 0,
    color: "rgba(255,255,255,.5)",
    fontSize: 16,
  },
  payoutTitle: {
    color: "#ffffff",
    fontSize: "1.56rem",

    margin: 0,
  },
  fulfillButton: {
    fontSize: 14,
    fontWeight: 400,
    border: "solid 1px rgb(231,232,234)",
    backgroundColor: "#70c78d",
    color: "#ffffff",
    width: "100%",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#60b77d",
    },
  },
  contributeButton: {
    fontSize: 14,
    fontWeight: 400,
    border: "solid 1px rgb(231,232,234)",
    marginTop: ".5rem",
    backgroundColor: "#ffffff",
    color: "#000000",
    width: "100%",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#efefef",
    },
  },
  details: {
    fontSize: 14,
    color: "#868e9c",
  },
  bold: {
    fontWeight: 500,
    color: "#000000",
    marginRight: 4,
    textTransform: "capitalize",
  },
  metricsTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    border: "solid 1px rgb(231,232,234)",
    marginTop: "2.5rem",
    padding: "1rem",
  },

  metricsBot: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    border: "solid 1px rgb(231,232,234)",
    borderTop: "none",
    padding: "1rem",
  },
  markdownContent: {
    color: "#111318",
    "& h1": {
      fontSize: "1.25rem",
      lineHeight: 1.75,
      paddingBottom: "1rem",
      fontWeight: 500,
    },
  },
  capitalize: {
    textTransform: "uppercase",
  },
}));

function addressFormatter(address) {
  if (address.length < 10) return null;

  return address.slice(0, 6) + "..." + address.slice(address.length - 4);
}

function B({ children }) {
  const classes = useStyles();
  return <b className={classes.bold}>{children}</b>;
}

export default function (props) {
  const classes = useStyles();
  const { bountyId } = useParams();
  const [bounty, setBounty] = useState(null);
  const currentDate = new Date().getTime();

  useEffect(() => {
    const initApp = async () => {
      const bounty = await getBounty(bountyId);
      console.log(bounty);
      setBounty(bounty);
    };
    initApp();
  }, []);

  if (!bounty) return null;

  return (
    <Container maxWidth="md" style={{ padding: 0 }}>
      <Grid container>
        <Grid item xs={12} style={{ marginBottom: "3.5rem" }}>
          <Grid container>
            <Grid item xs={6} sm={3}>
              <div className={classes.payoutBalance}>
                <p className={classes.payoutLabel}>Payout</p>
                <p className={classes.payoutTitle}>
                  {bounty.payAmount}{" "}
                  <span className={classes.capitalize}>{bounty.payMethod}</span>
                </p>
                <p className={classes.payoutFade}>$0.00</p>
                <p
                  className={classes.payoutLabel}
                  style={{ marginTop: "1rem" }}
                >
                  Remaining Balance
                </p>
                <p className={classes.payoutTitle}>
                  {bounty.payAmount}{" "}
                  <span className={classes.capitalize}>{bounty.payMethod}</span>
                </p>
                <p className={classes.payoutFade}>$0.00</p>
              </div>
            </Grid>
            <Grid item xs={6} sm={9}>
              <p className={classes.title}>{bounty.title}</p>
              <div>
                {bounty.categories.map((category) => {
                  return (
                    <Chip
                      key={category}
                      label={category}
                      variant="outlined"
                      className={classes.chip}
                    ></Chip>
                  );
                })}
              </div>
              <div
                style={{
                  height: 32,
                  display: "flex",
                  clear: "both",
                  marginTop: 20,
                }}
              >
                <Avatar
                  alt="User Name"
                  src={null}
                  className={classes.avatar}
                  style={{
                    height: 32,
                    width: 32,
                    float: "left",
                    border: "solid 2px #ffffff",
                  }}
                />

                <span
                  style={{
                    paddingTop: 8,
                    paddingLeft: 6,
                    color: "#ffffff",
                    fontSize: 14,
                  }}
                >
                  {addressFormatter("0x1234912387654")}
                </span>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={1} className={classes.paper}>
            <Grid container>
              <Hidden smUp>
                <Grid item xs={12} md={4}>
                  <Button className={classes.fulfillButton}>Fulfill</Button>
                  <Button className={classes.contributeButton}>
                    Contribute
                  </Button>

                  <Grid container>
                    <Grid item xs={12} className={classes.details}>
                      <div className={classes.metricsTop}>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <VisibilityIcon fontSize="small" />
                            </span>
                            <B>0</B> views
                          </div>
                        </div>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <QueryBuilderIcon fontSize="small" />
                            </span>
                            <B>
                              {Math.round(
                                (bounty.deadline - currentDate) /
                                  1000 /
                                  60 /
                                  60 /
                                  24,
                                0
                              )}{" "}
                              days
                            </B>{" "}
                            remaining
                          </div>
                        </div>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <ExtensionOutlinedIcon fontSize="small" />
                            </span>
                            <B>{bounty.difficulty}</B> difficulty
                          </div>
                        </div>

                        <div>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 0, marginRight: 4 }}>
                              <PublishIcon />
                            </span>
                            <B>{bounty.revisions} revisions</B> expected
                          </div>
                        </div>
                      </div>
                      <div className={classes.metricsBot}>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <AttachmentIcon fontSize="small" />
                            </span>
                            Attachment
                          </div>
                        </div>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <LinkIcon fontSize="small" />
                            </span>
                            link
                          </div>
                        </div>

                        <div>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 0, marginRight: 4 }}>
                              <MailOutlineIcon />
                            </span>
                            Email
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
              <Grid
                item
                xs={12}
                md={8}
                className={`${classes.markdownContent} markdownContent`}
              >
                <ReactMarkdown>{bounty.description}</ReactMarkdown>
              </Grid>
              <Hidden smDown>
                <Grid item xs={12} md={4}>
                  <Button className={classes.fulfillButton}>Fulfill</Button>
                  <Button className={classes.contributeButton}>
                    Contribute
                  </Button>

                  <Grid container>
                    <Grid item xs={12} className={classes.details}>
                      <div className={classes.metricsTop}>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <VisibilityIcon fontSize="small" />
                            </span>
                            <B>0</B> views
                          </div>
                        </div>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <QueryBuilderIcon fontSize="small" />
                            </span>
                            <B>
                              {Math.round(
                                (bounty.deadline - currentDate) /
                                  1000 /
                                  60 /
                                  60 /
                                  24,
                                0
                              )}{" "}
                              days
                            </B>{" "}
                            remaining
                          </div>
                        </div>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <ExtensionOutlinedIcon fontSize="small" />
                            </span>
                            <B>{bounty.difficulty}</B> difficulty
                          </div>
                        </div>

                        <div>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 0, marginRight: 4 }}>
                              <PublishIcon />
                            </span>
                            <B>{bounty.revisions} revisions</B> expected
                          </div>
                        </div>
                      </div>
                      <div className={classes.metricsBot}>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <AttachmentIcon fontSize="small" />
                            </span>
                            Attachment
                          </div>
                        </div>
                        <div style={{ marginBottom: ".5rem" }}>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 2, marginRight: 4 }}>
                              <LinkIcon fontSize="small" />
                            </span>
                            link
                          </div>
                        </div>

                        <div>
                          <div style={{ display: "flex", clear: "both" }}>
                            <span style={{ marginTop: 0, marginRight: 4 }}>
                              <MailOutlineIcon />
                            </span>
                            Email
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
