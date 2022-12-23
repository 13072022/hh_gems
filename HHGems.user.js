// ==UserScript==
// @name        HH and PH Gems inventory
// @namespace   https://github.com/13072022/hh_gems
// @version     1
// @description Get the gems inventory in HH and PH
// @grant       none
// @match       http*://*.hentaiheroes.com/*
// @match       http*://*.pornstarharem.com/*
// @updateURL   https://github.com/13072022/hh_gems/raw/main/HHGems.user.js
// @downloadURL https://github.com/13072022/hh_gems/raw/main/HHGems.user.js
// ==/UserScript==


setTimeout(add_gems, 500);

function add_gems() {
  var gems;
  if (window.location.href.indexOf("/harem/") > -1) {
    gems = window.player_gems_amount;
    if (gems == undefined) {console.log("player_gems_amount not found"); setTimeout(add_gems,500); return 0;}
    localStorage.HH_gems_amount = JSON.stringify(gems);
  }
  gems = localStorage.HH_gems_amount;
  if (gems) {
    var troll_names = {
      'hentai': ['', '','Dark Lord','Ninja Spy','Gruntt','Edwarda','Donatien','Silvanus','Bremen','Finalmecia','Roko Senseï','Karole','Jackson&#8217;s Crew','Pandora Witch','Nike','Sake','WereBunny Police','Auga'],
      'star_t': ['','','Headmistress Asa Akira','Sammy Jayne','Ivy Winters','Lily Cade','Amia Miley','Alyssa Reece','Kelly Kline']
    };
    var prizes_worlds = {
      'darkness':[3, 6, 14],
      'light':   [3, 7, 15],
      'psychic': [4, 8, 16],
      'water':   [4, 9, 17],
      'fire':    [2, 10],
      'nature':  [5, 11],
      'stone':   [5, 12],
      'sun':     [2, 13]
    };
    var prizes = {};
    var trolls = troll_names[window.HH_UNIVERSE];
    if (trolls == undefined) { trolls = []; }
    var k = Object.keys(prizes_worlds);
    k.forEach(e => { let s=[]; prizes_worlds[e].forEach(e1 => { if (trolls[e1]) {s.push(e1+"-"+trolls[e1])} } ); prizes[e] = s.join(", "); } );
    gems = JSON.parse(gems);
    var btn = document.getElementById('chat_btn');
    if (btn) {
      var e = Object.keys(gems);
      var table = `<table class="gems-table"><tbody>
                ${e.map(e=>`<tr><td><img src="https://th.hh-content.com/pictures/design/gems/${e}.png"></td>
                                <td>${gems[e].amount}</td><td>&nbsp;</td><td>${prizes[e]}</td></tr>`).join("")}
                   </tody></table>`.replace(/(\n| {4})/g,"");
      btn.innerHTML = `<style>.gems-table {text-align:left;} .gems-table img{height:25px;width:25px}
.gems {width:37px;display:block;padding:6px 12px;background-size:contain;background-image: url("https://hh2.hh-content.com/pictures/design/gems/all.png")</style>
      <div class="gems" hh_title='`+table+`' tooltip-id="tooltip_1">&nbsp;</div>`;
      console.log("gems inventory added");
    }
  }
}

