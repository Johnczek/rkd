export const environment = {
  production: true,

  api: "http://10.30.137.11:5823",

  apiAllTrains: "/loks",

  apiDetailDetail: "/lokStav/",

  apiChangeTrain: "/lokStav/",

  // Cesta k obrázkům (všechny obrázky musí být ve formátu jpg)
  pictureBaseURL: "http://lrkv.pef.mendelu.cz/wcd/w-pef-lrkv/clanky/",

  // Defaultní cesta k obrázku pokud není obrázke na serveru nalezen
  defaultPicturePath: "assets/images/trains/default.png",
};
