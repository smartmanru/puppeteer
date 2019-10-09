var _=require('underscore')
var puppeteer = require('puppeteer');
var  arr = require('./link');
var link_cve=[]
var vm = this;
for (var i=0;i < 5;i++){
  setTimeout(function(){
(async () => {
  var browser = await puppeteer.launch(
    {headless:true,args: ['--no-sandbox', '--disable-setuid-sandbox']});
    var page = await browser.newPage();
    //   await page.goto(arr[i], {waitUntil: 'networkidle2'});
    
    
    try {
      // Попробуем перейти по URL
      await page.goto(arr[i], {waitUntil: 'networkidle2'});
      console.log('Открываю страницу:' + arr[i]);
      var postsSelector = '#vulnslisttable > tbody > tr > td > a';
      await page.waitForSelector(postsSelector, { timeout: 0 });
      var postUrls = await page.$$eval(
        postsSelector, cve_links=>cve_links.map(link=>link.href));
        var url_cve=_.compact(postUrls)
        
        // console.log(postUrls);
    } catch (error) {
      console.log(`Не удалось открытm страницу: ${arr[i]} из-за ошибки: ${error}`);
    }
// Найдём все ссылки на статьи   


console.log(url_cve);
}
)
();
}, 1000);
}



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
