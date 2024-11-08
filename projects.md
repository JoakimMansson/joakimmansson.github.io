---
layout: page
title: "Projects"
permalink: /projects/
---

{% assign projects = site.projects %}

<ul class="posts-list list-unstyled" role="list">
  {% for project in projects %}
  <li class="post-preview">
    <article>

      {%- capture thumbnail -%}
        {% if project.thumbnail-img %}
          {{ project.thumbnail-img }}
        {% elsif project.cover-img %}
          {% if project.cover-img.first %}
            {{ project.cover-img[0].first.first }}
          {% else %}
            {{ project.cover-img }}
          {% endif %}
        {% else %}
        {% endif %}
      {% endcapture %}
      {% assign thumbnail=thumbnail | strip %}

      {% if site.feed_show_excerpt == false %}
      {% if thumbnail != "" %}
      <div class="post-image post-image-normal">
        <a href="{{ project.url | absolute_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | absolute_url }}" alt="Project thumbnail">
        </a>
      </div>
      {% endif %}
      {% endif %}

      <a href="{{ project.url | absolute_url }}">
        <h2 class="post-title">{{ project.title | strip_html }}</h2>

        {% if project.subtitle %}
          <h3 class="post-subtitle">
          {{ project.subtitle | strip_html }}
          </h3>
        {% endif %}
      </a>

      {% if project.author %}
        <span>By <strong>{{ project.author | strip_html }}</strong></span>
      {% endif %}
      <p class="post-meta">
        {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
        Posted on {{ project.date | date: date_format }}
      </p>

      {% if thumbnail != "" %}
      <div class="post-image post-image-small">
        <a href="{{ project.url | absolute_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | absolute_url }}" alt="Project thumbnail">
        </a>
      </div>
      {% endif %}

      {% unless site.feed_show_excerpt == false %}
      {% if thumbnail != "" %}
      <div class="post-image post-image-short">
        <a href="{{ project.url | absolute_url }}" aria-label="Thumbnail">
          <img src="{{ thumbnail | absolute_url }}" alt="Project thumbnail">
        </a>
      </div>
      {% endif %}

      <div class="post-entry">
        {% assign excerpt_length = site.excerpt_length | default: 50 %}
        {{ project.excerpt | strip_html | truncatewords: excerpt_length }}
        {% assign excerpt_word_count = project.excerpt | number_of_words %}
        {% if project.content != project.excerpt or excerpt_word_count > excerpt_length %}
          <a href="{{ project.url | absolute_url }}" class="post-read-more">[Read&nbsp;More]</a>
        {% endif %}
      </div>
      {% endunless %}

      {% if site.feed_show_tags != false and project.tags.size > 0 %}
      <div class="blog-tags">
        <span>Tags:</span>
        <ul class="d-inline list-inline" role="list">
          {% for tag in project.tags %}
          <li class="list-inline-item">
            <a href="{{ '/tags' | absolute_url }}#{{- tag -}}">{{- tag -}}</a>
          </li>
          {% endfor %}
        </ul>
      </div>
      {% endif %}

    </article>
  </li>
  {% endfor %}
</ul>
