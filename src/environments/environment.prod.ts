export const environment = {
  production: true,

  api: "http://localhost:80/rkd-api/www",

  apiAllTrains: "/loks",

  apiDetailDetail: "/lokStav/",

  apiChangeTrain: "/lokStavU/",

  // Cesta k obrázkům (všechny obrázky musí být ve formátu jpg)
  pictureBaseURL: "http://lrkv.pef.mendelu.cz/wcd/w-pef-lrkv/clanky/",

  // Defaultní cesta k obrázku pokud není obrázke na serveru nalezen
  defaultPicturePath: "assets/images/trains/default.png",
};
