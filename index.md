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
<ul class="list-group-flush leaderboard" style="">
  {% for player in players reversed %}
      <li class="list-group-item">
        <div class="row">

          <div class="col-1"><img class="gravatar" src="{{ player.email | to_gravatar }}?s=60&d=robohash" /></div>
          <div class="col">{{ player.name }}</div>
          <div class="col text-right">{{ player.score }}</div>
        </div>      
      </li>
  {% endfor %}
</ul>
