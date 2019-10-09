var _=require('underscore')
var puppeteer = require('puppeteer');
var cve_pr=0;
var cvim_ve=[];
var report=[];
var  arr = require('./link');
var aurl_cve=[]
var vm = this;
var linkb=[];
setTimeout(function(){
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
        vers, cvim_ve=>cvim_ve.map(link=>link.textContent));

    	var cve_prod = await page.$$eval(
        prod, cve_pr=>cve_pr.map(link=>link.textContent));
        // console.log('Открываю страницу:' + linkb);
        cve_pr=_.uniq(cve_pr).toString
  var post=[cve_pr,[cvim_ve]]
		var report=_.compact(post)
	report.push(post)
        // await browser.close()
	}
    } catch (error) {
      console.log(`Не удалось открытm страницу: ${linka} ${linkb} из-за ошибки: ${error}`);
      await browser.close()

    }
// Найдём все ссылки на статьи   


// console.log(url_cve);
aurl_cve.push({link:[url_cve]})

}}
)
();
}, 1000);



// 	let countel=await page.evaluate(()=> (document.querySelector("").children.length-1)/2 );
// 	console.log(countel);
// 	for (let d = 1;d<countel; d++){
		

// 		console.log(d)
// console.table(await page.evaluate((d) =>(
// 	document.querySelector("#vulnslisttable > tbody");
// )));
// 		console.log(link_cve)
// 		// console.log(href_a);
// 		// link_cve.push(href_a);
// }
// // 
// await browser.close();
// // }
// catch(e){
// console.log("error in page")}	
// await browser.close();

/*
for (d=0;d<countel;d=d+2){
	
	setTimeout(function(){

	await page.goto(link_cve,{waitUntil:'networkidle2'});
	let product= await page.evaluate(()=> (document.querySelector("#vulnprodstable > tbody").children[i].children[3].textContent);
	let version= await page.evaluate(()=> (document.querySelector("#vulnprodstable > tbody").children[i].children[4].textContent);
		console.table([product,version])
	await page.close()
	,10000}
}
*/
// (document.querySelector("#vulnslisttable > tbody").children.length-1)/2 //list cve search
//V~await browser.close();
// document.querySelector("#vulnslisttable > tbody").children[var i+2] //перечисление ссылок 
// document.querySelector("#vulnslisttable > tbody").children[1].children[1].children[0].href //link
// document.querySelector("#vulnprodstable > tbody").children[i].children[3].textContent //product
// document.querySelector("#vulnprodstable > tbody").children[i].children[4].textContent //vesrion
