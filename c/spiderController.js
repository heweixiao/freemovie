const request = require('request');
const cheerio = require('cheerio');
const youkuSpider = (id)=> {
  return new  Promise( function(resolve,reject) {
    request(`https://list.youku.com/category/show/c_96_pt_1_s_4_d_1_p_${id}.html`, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
        let array = [];
        $('.yk-pack.pack-film').each(function(i,item) {
          let obj = {};
          obj.id = i;
          obj.title = $(this).find('.title a').text();
          obj.link =  $(this).find('a').attr('href');
          obj.type =  $(this).find('.p-time span').text();
          obj.desc = `${$(this).find('.info-list .actor').text()};${$(this).find('.info-list').children("li:last-child").text()}`;
          obj.img = $(this).find('img').attr('src');
          obj.type !== '预告' && array.push(obj);
        });
        resolve(array);
      }
    });
  })
}

const aqySpider = (id)=> {
  return new  Promise( function(resolve,reject) {
    request(`https://list.iqiyi.com/www/1/----------0---11-${id}-1-iqiyi--.html`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
        let array = [];
        $('.qy-mod-ul li').each(function(i,item) {
          let obj = {};
          obj.id = i;
          obj.title = $(this).find('.title-wrap .link-txt').text();
          obj.link =  $(this).find('.qy-mod-link').attr('href');
          obj.desc = $(this).find('.title-wrap .sub').text();
          // obj.img = $(this).find('.randomPopIn').css("backgroundImage");
          array.push(obj);
        });
        resolve(array);
      }
    });
  })
}



module.exports = {youkuSpider, aqySpider};