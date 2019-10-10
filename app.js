var cve_prod=0
var _=require('underscore')
var puppeteer = require('puppeteer');
var fs =require('fs');
var cve_pr=0;
var cvim_ve=[];
var report=[];
var  arr = require('./link');
var aurl_cve=[]
var s = require("underscore.string");
var vm = this;
var linkb=[];
var post=[];
(async () => {
  var browser = await puppeteer.launch(
    {headless:true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
    for (let linka of arr){
    var page = await browser.newPage();
    try {
      // Попробуем перейти по URL
      await page.goto(linka, {waitUntil: 'networkidle2'});
      console.log('Открываю страницу:' + linka);
      var postsSelector = '#vulnslisttable > tbody > tr > td:nth-child(2) > a';

	await page.waitForSelector(postsSelector, { timeout: 0 });
      var postUrls = await page.$$eval(
        postsSelector, cve_links=>cve_links.map(link=>link.href));

	    // console.log('Открываю страницу:' + linka);
        var url_cve=_.compact(postUrls);
        // await browser.close()
	for (let linkb of url_cve){
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
        var post=[cve_prod,cvim_vers];
        console.log('post :', post);
        
		var report=(post);
  console.log('report :', report);
	report.push(post);
        // await browser.close()
	}
    } catch (error) {
      console.log(`Не удалось открытm страницу: ${linka} ${linkb} из-за ошибки: ${error}`);
      await browser.close()

    }
// Найдём все ссылки на статьи   


// console.log(url_cve);
// aurl_cve.push(linkb,[url_cve])
console.log(post)
console.table(report)
fs.appendFile("./endfile.txt",post, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
fs.appendFile("./8endfile.txt",report, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
}}

)();



