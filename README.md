# Rkd
## SPUŠTĚNÍ NA KTERÉMKOLI POČÍTAČI
1. Jděte do C:\Users\root\PhpstormProjects\rkd (tam už je rozběhnutá verze) případně git clone z (https://github.com/Johnczek/strojvudce) a npm install ve složce s projektem
2. Spusťte příkaz z příkazové řádky --> ng s (zapne angular aplikaci)
- Pokud dostanete hlášku že ng není příkazem windows, je třeba pustit v příkazové řádce ještě příkaz "npm install -g @angular/cli"¨
- Tento příkaz doinstaluje program pro angular za pomocí kterého lze program spustit
- Pokud dostanete stejnou hlášku na spuštění npm, nemáte správně nainstalovaný NODE! Je třeba ho nainstalovat znovu (pokud jste tak již učinili, zkuste restart počítače). Stav NodeJs lze zjistit příkazem "node -v"
3. Aplikace běží na http://localhost:4200 (Mějte prosím strpení, rozběhnutí aplikace chvíli trvá a to, že je aktivní poznáte z hlášky "Compiled successfully")


## ROZBĚHNUTÍ NA SERVERU
1. Je třeba server na kterém je Apache a Node. Rozbalte případně clone z (https://github.com/Johnczek/strojvudce) a přejděte do složky s projektem
2. Spusťte "npm install -g @angular/cli" (nainstaluje náležitosti angularu)
3. Spusťte "npm install" (dostahuje náležitosti projektu
4. Spusťte "ng build --prod". Ten zkompiluje projekt do složky "dist" (v rootu projektu). Obsha složky dist vystavte do složky, která bude přístupná zvenčí
5. Pokud aplikace na daném endpointu nefunguje, změňte v souboru index.html "<base href="/">" na "<base href="./">
6. Aplikace by měla být plně funkční


## Informace o aplikaci
- Jedná se o single page aplikaci napsanou v Angularu
- Chyby v aplikaci se vypisují do javascriptové konzole (F12 ve většině prohlížečů, záložka console). I to může pomoci při troubleshootingu.
- Pokud změníte některou část kódu, je třeba (uvažujeme-li běh na serveru v komprimované verzi) znovu zbuildit projekt
- Dokud nebude Cors privacy nastavené na API, je třeba využívat addon (https://addons.mozilla.org/cs/firefox/addon/cors-everywhere/) (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?utm_source=chrome-app-launcher-info-dialog ) jinak nebude napojení na api funkční.
- Důležité soubory
- - enviroment.prod.ts - statické informace (Například o napojení na API, cesty k defaultnímu obrázku atp.)
- - train.component.ts - komponenta detailu vlaku. Naleznete zde mapování kláves. Jak statických tak dynamických. Jejich změna je dokumentána nad danými proměnnými. 
- - api.service.ts - služba starající se o dotazy na API
- - train.service.ts - služba, která u sebe drží objekty všech vlaků a celá aplikace s nimi pracuje. Provádí valnou většinu business logiky nad nimi
- - train.model.ts - modele vlaku, v případě rozšiřování stačí přidat instanční proměnnou a Object.assign se postará o správné namapování. Bude-li tato položka měnitelná, bude třeba doplnit i další logiku ve výše zmíněných třídách

