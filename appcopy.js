var cve_prod=0
var _=require('underscore')
var puppeteer = require('puppeteer');
var fs =require('fs');
var cve_pr=0;
var cvim_ve=[];
var report=[];
var  arr = require('./cve_list');
var aurl_cve=[]
var s = require("underscore.string");
var vm = this;
var linkb=[];
var post=[];
(async () => {
  var browser = await puppeteer.launch(
    {headless:true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
    for (let linkb of arr){
    var page = await browser.newPage();
    try {
   
	    await page.goto(linkb, {waitUntil: 'networkidle2'});
      console.log('Открываю страницу:' + linkb);
	var vers='#vulnprodstable > tbody > tr> td:nth-child(5)'

	var prod='#vulnprodstable > tbody > tr> td:nth-child(4)'
//        console.log(url_cve);
	await page.waitForSelector(prod, { timeout: 0 });
    	var cvim_vers = await page.$$eval(
        vers, cvim_ve=>cvim_ve.map(linke=>linke.textContent));

    	 cve_prod =await page.$$eval(
        prod, cve_pr=>cve_pr.map(linkd=>linkd.textContent));
        // console.log('Открываю страницу:' + linkb);
        for (var co=0;co <cvim_vers.length;co++){
          var post=["["+cve_prod[co],cvim_vers[co],linkb+"]"];
          
          report.push(post);
          
          console.log('post :', post);
        }
        
  console.log('report :', report);
        // await browser.close()
	}
    catch (error) {
      console.log(`Не удалось открытm страницу: ${linka} ${linkb} из-за ошибки: ${error}`);
      await browser.close()

    }
// Найдём все ссылки на статьи   


// console.log(url_cve);
// aurl_cve.push(linkb,[url_cve])
fs.writeFile("./1endfile.txt",report, function (err) {  if (err) throw err;
  console.log('Saved!');
});
}}

)();



