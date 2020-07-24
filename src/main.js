var getLinks = function() {
  var header, tag, headerLevelStr, depth;
  var headers = document.querySelectorAll('.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6');
  var links = [];

  for (var i = 0; i < headers.length; ++i) {
    header = headers[i];
    tag = header.tagName;
    headerLevelStr = tag.substring(1);
    depth = Number.parseInt(headerLevelStr);

    if(typeof header.children[0] !== 'undefined'){
      links.push({
        text: header.innerText,
        hash: header.children[0].hash,
        depth: depth
      });
    }
  }

  return links;
};



var openList = function(depth) {
  var html = '';

  while (depth--) {
    html += '<li><ul>';
  }

  return html;
};

var closeList = function(depth) {
  var html = '';

  while (depth--) {
    html += '</ul></li>';
  }

  return html;
};

var buildContents = function(links) {
  var node;
  var contents = '<ul class="toc__ul">';
  var currentDepth = 1;

  for (var i = 0; i < links.length; ++i) {
    node = links[i];

    if (node.depth > currentDepth) {
      contents += openList(node.depth - currentDepth);
    } else if (node.depth < currentDepth) {
      contents += closeList(currentDepth - node.depth);
    }

    currentDepth = node.depth;

    contents += '<li class="toc__lineDepth-' + currentDepth + '"><a title="' + node.text + '" href="' + node.hash + '">' + node.text + '</a></li>';
  }

  while (currentDepth--) {
    contents += '</ul>';
  }

  return contents;
};

  var section = document.getElementsByClassName('flex-shrink-0 col-12 col-md-3');
  var toc = document.createElement("div");
  toc.className = "toc toc__row";
  console.log(section);
  var links;

  if(typeof(section[0]) != 'undefined' && section[0] != null){
    section[0].appendChild(toc);
    links = getLinks();
  }

  if(typeof links !== 'undefined' && links.length !== 0 &&  typeof document.getElementsByClassName("toc")[0] !== 'undefined'){
    document.getElementsByClassName("toc")[0].innerHTML = "<div class='Box-header toc__header'><h2 class='Box-title toc_title'>Table Of Contents</h2></div>" + buildContents(links)
  }
