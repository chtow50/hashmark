import{D as e,O as t}from"./index-BViuAF7G.js";function n(e,t){return`${e}–${t}`}function r(e,t){return e>t?{seasonWins:1,seasonLosses:0}:e<t?{seasonWins:0,seasonLosses:1}:{seasonWins:0,seasonLosses:0}}function i(e){let n=0,i=0;for(let a of e){if(!t(a))continue;let e=r(a.home?a.homeScore:a.awayScore,a.home?a.awayScore:a.homeScore);n+=e.seasonWins,i+=e.seasonLosses}return{seasonWins:n,seasonLosses:i}}function a(){return e.filter(t).map(e=>{let t=i([e]);return{slug:e.teamSlug,win:t.seasonWins,loss:t.seasonLosses}})}function o(){let e=a();return e.length===0?``:`
      union all
      select t.id, v.win, v.loss
      from (values
        ${e.map(e=>`('${e.slug.replace(/'/g,`''`)}', ${e.win}::int, ${e.loss}::int)`).join(`,
        `)}
      ) as v(slug, win, loss)
      join teams t on t.slug = v.slug`}`${o()}`;export{n as t};