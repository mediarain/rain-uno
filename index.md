---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: default
title: UNO Leaderboard
---
<div class="row">
  <img class="rounded mx-auto d-block" src="img/uno.svg" width="30%" height="30%">
</div>

<h1 class="title text-center display-4">LEADERBOARD</h1>
{% assign players = site.data.score.players | sort: 'score' %}
<div class="row">
  <div class="col text-center"><h3>End of the tournament, November 28th. {{ players.last.name }} must not win!</h3></div>  
</div>  



<ul class="list-group-flush leaderboard" style="">
  {% for player in players reversed %}
      <li class="list-group-item">
        <div class="row">
          <div class="col-1">#{{ forloop.index }}</div>
          <div class="col-1"><img class="gravatar" src="http://www.gravatar.com/avatar/{{ player.hash }}?s=60&amp;d=robohash" /></div>
          <div class="col-5">{{ player.name }}</div>
          <div class="col-5 text-right">{{ player.score }}</div>
        </div>      
      </li>
  {% endfor %}
</ul>
