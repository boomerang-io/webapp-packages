const navigation = {
  navigation: [
    { name: "Launchpad", url: "https://launch.boomerangplatform.net/launchpad" },
    { name: "Catalog", url: "https://launch.boomerangplatform.net/catalog" },
    { name: "Status", url: "https://launch.boomerangplatform.net/status" },
    { name: "Docs", url: "https://launch.boomerangplatform.net/docs" },
    { name: "Admin", url: "https://launch.boomerangplatform.net/admin" },
  ],
  features: {
    "notifications.enabled": false,
  },
  platform: {
    name: "IBM Boomerang Platform",
    version: "5.0.0",
    signOutUrl: "ibm.com",
    platformName: "Boomerang",
    displayLogo: true,
    privateTeams: false,
    sendMail: true,
  },
};

export default navigation;
