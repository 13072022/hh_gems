// ==UserScript==
// @name        HH and PH Gems inventory
// @namespace   https://github.com/13072022/hh_gems
// @version     7
// @description Get the gems inventory in HH and PH
// @grant       none
// @match       http*://*.hentaiheroes.com/*
// @match       http*://*.pornstarharem.com/*
// @updateURL   https://github.com/13072022/hh_gems/raw/main/HHGems.user.js
// @downloadURL https://github.com/13072022/hh_gems/raw/main/HHGems.user.js
// ==/UserScript==

const troll_names_index = {
  'hentai':0,'horny_s':0,'nutaku':0,'test_h':0,'hh_eroges':0,'gay':0,'gh_nutaku':0,'gh_eroges':0,'star_t':1,'nutaku_t':1,'comix_c':2,'nutaku_c':2};
const troll_names = [
  ['Dark Lord','Ninja Spy','Gruntt','Edwarda','Donatien','Silvanus','Bremen','Finalmecia','Roko Senseï','Karole','Jackson&#8217;s Crew','Pandora Witch','Nike','Sake','WereBunny Police','Auga','Gross'],
  ['Headmistress Asa Akira','Sammy Jayne','Ivy Winters','Sophia Jade','Amia Miley','Alyssa Reece','Kelly Kline','Jamie Brooks','Jordan Kingsley','Sierra Sinn','Jasmine Jae'],
  ['BodyHack', 'Grey Golem', 'The Nymph', 'Athicus Ho&#8217;ole', 'The Mimic', 'Cockatrice', 'Pomelo']];
const prizes_worlds = {
  'darkness':[3, 6, 14],
  'light':   [3, 7, 15],
  'psychic': [4, 8, 16],
  'water':   [4, 9, 17],
  'fire':    [2, 10],
  'nature':  [5, 11],
  'stone':   [5, 12],
  'sun':     [2, 13]
};

setTimeout(add_gems, 500);

function update_resources() {
  var params = { action: "hero_get_resources" };
  hh_ajax(params, function(data) {
    localStorage.HH_gems_amount = JSON.stringify(data.gems);
    console.log("Gems inventory updated");
    add_gems();
  });
}

function add_gems() {
  var gems;
  if (window.location.href.indexOf("/harem/") > -1) {
    gems = window.player_gems_amount;
    if (gems != undefined) {
      localStorage.HH_gems_amount = JSON.stringify(gems);
    }
  }
  gems = localStorage.HH_gems_amount;
  if (gems) {
    gems = JSON.parse(gems);
    var btn = document.getElementById('chat_btn');
    if (btn) {
      // ----- update on click
      try { $("a#chat_btn").prop("onclick", null).off("click"); } catch(e) {}
      btn.addEventListener("click", update_resources);
      // -----
      var prizes = {};
      var trolls = troll_names[troll_names_index[window.HH_UNIVERSE]];
      if (trolls == undefined) { trolls = []; }
      var max_world = 18;
      try { max_world = window.Hero.infos.questing.id_world} catch(e) { }
      var k = Object.keys(prizes_worlds);
      k.forEach(e => {
        let s=[];
        prizes_worlds[e].forEach(e1 => {
          if (e1 <= max_world && trolls[e1-2]) { s.push("<span class='world'>"+e1+"</span> "+trolls[e1-2]) }
        });
        prizes[e] = s.join(", ");
      });
      var gemsSorted = Object.keys(gems).sort(function(a,b){return gems[b].amount-gems[a].amount}); // sort by gems amount in descending order
      var table = `<table class='gems-table'><tbody>
                ${gemsSorted.map(e=>`<tr><td><img src='https://th.hh-content.com/pictures/design/gems/${e}.png'></td>
                                     <td>${gems[e].amount}</td><td>&nbsp;</td><td>${prizes[e]}</td></tr>`).join("")}
                   </tbody></table>`.replace(/(\n| {2})/g,"");
      btn.innerHTML = `<style>.gems-table {text-align:left;} .gems-table img{height:25px;width:25px}
.world {border: 1px solid; border-radius: 15px; width: 23px !important; display: inline-block; text-align: center;}
.gems {width:37px;display:block;padding:6px 12px;background-size:contain;background-image: url("https://hh2.hh-content.com/pictures/design/gems/all.png")</style>
      <div class="gems" hh_title="`+table+`" tooltip>&nbsp;</div>`;
      console.log("Gems inventory added");
    }
  }
}

