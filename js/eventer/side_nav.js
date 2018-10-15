// Åpner og lukker sidenavigasjonen - Må forbedres!
$('.navigasjon').on('click', function () {

  if (this.id === 'åpne_nav') {
    $('#mySidenav').css('width', '250px')
    $('#main').css('marginLeft', '250px')
  }
  else {
    $('#mySidenav').css('width', '0')
    $('#main').css('marginLeft', '0')
  };

  Legg_Til_Overskrift();

});


// Legger til overskrifter in navigasjonsmenyen
Legg_Til_Overskrift = () => {

  let destinasjon = $('#nav_innhold');
  let Navigator = document.createElement("ul");
  let Overskrifter = $('h2');


 $.Each(Overskrifter, function(index, value) {
   console.log(index);
    //console.log($(this).html());
  });
};

/* new_HTML = $("h2").map(function(n){
    return this.url //('<a href="' + this.url + '#">' + this.text + '</a>');
    }); */
/* 

/* 
Bygger innholdet - menuNode er navigatoren/listeelementet ('ul') 
_buildMenuContent: function (menuNode) {
  var alternatives = "", menuItems = this.menuItems, key;

  // Går gjennom alle key(?) in menuitems, og legger til en hyperlenke
  // Dette er ennå et tomt listeelement
  // Virker som menuItems er overskriftene på siden?
  for (key in menuItems) {
    if (menuItems.hasOwnProperty(key)) {
      alternatives += '<li><a href="' + menuItems[key].url + '" target="_self">' + menuItems[key].caption + '</a></li>';
    }
  }

  template = template.replace("{linkplaceholder}", alternatives);
  template = template.replace("{episervertext}", this.menuTitle);

  menuNode.id = "epi-quickNavigator";
  menuNode.innerHTML = template.replace("{0}", this.defaultUrl || "#");
} */

(function (scope) {

  // Templaten som brukes på funksjonen
  var template = '<li class="epi-quickNavigator-editLink"><a href="{0}" target="_self"><span>{episervertext}</span></a></li> \
                    <li class="epi-quickNavigator-dropdown"> \
                        <a id="epi-quickNavigator-clickHandler" class="epi-quickNavigator-dropdown-arrow" href="javascript:void(0)"></a> \
                        <ul id="epi-quickNavigator-menu">{linkplaceholder}</ul> \
                    </li>';

  // Event listener
  function on(target, eventType, listener) {
    var onEventType = "on" + eventType;
    if (target.addEventListener) {
      target.addEventListener(eventType, listener, false);
    } else {
      target.attachEvent(onEventType, listener);
    }
    return {
      remove: function () {
        if (target.addEventListener) {
          target.removeEventListener(eventType, listener, false);
        } else {
          target.detachEvent(onEventType, listener);
        }
        target = null;
      }
    };
  }

  scope.QuickNavigator = function (settings) {

    if (window.self !== window.top) {
      return;
    } // we're being framed, Abort!

    var self = scope.QuickNavigator.instance = this;

    this.menuTitle = settings.menuTitle || "";
    this.defaultUrl = settings.defaultUrl || "";
    this.menuItems = settings.menuItems || {};
    this.isInitialized = false;

    this._listeners = [];

    this._listeners.push(on(window, "load", function () {
      self.initialize();
    }));
    this._listeners.push(on(window, "unload", function () {
      self.destroy(true);
    }));
  };

  scope.QuickNavigator.prototype = {

    initialize: function () {

      if (this.isInitialized) {
        return;
      }

      var quickNavigator,
        handler,
        popup;

      quickNavigator = document.createElement("ul");
      // Lager innhold
      this._buildMenuContent(quickNavigator);
      document.body.appendChild(quickNavigator);

      handler = document.getElementById("epi-quickNavigator-clickHandler");
      popup = document.getElementById("epi-quickNavigator-menu");

      if (handler) {
        this._listeners.push(on(handler, "click", function () {
          popup.style.display = "block";
        }));
        this._listeners.push(on(document, "mouseup", function () {
          popup.style.display = "none";
        }));
      }

      this.isInitialized = true;
    },

    // Bygger innholdet - menuNode er navigatoren/listeelementet ('ul') 
    _buildMenuContent: function (menuNode) {
      var alternatives = "", menuItems = this.menuItems, key;

      // Går gjennom alle key(?) in menuitems, og legger til en hyperlenke
      // Dette er ennå et tomt listeelement
      // Virker som menuItems er overskriftene på siden?
      for (key in menuItems) {
        if (menuItems.hasOwnProperty(key)) {
          alternatives += '<li><a href="' + menuItems[key].url + '" target="_self">' + menuItems[key].caption + '</a></li>';
        }
      }

      template = template.replace("{linkplaceholder}", alternatives);
      template = template.replace("{episervertext}", this.menuTitle);

      menuNode.id = "epi-quickNavigator";
      menuNode.innerHTML = template.replace("{0}", this.defaultUrl || "#");
    },

    destroy: function (keepDom) {

      var popup;

      for (var i = 0; i < this._listeners.length; i++) {
        this._listeners[i].remove();
      }

      delete this._listeners;
      delete scope.QuickNavigator.instance;

      if (!keepDom) {
        popup = document.getElementById("epi-quickNavigator");
        if (popup) {
          popup.parentNode.removeChild(popup);
        }
      }
    },

    addMenuItem: function (key, caption, url, javascript, enabled, imageUrl, subMenu, sortKey) {

      this.menuItems[key] = {
        caption: caption,
        url: url,
        javscript: javascript,
        enablad: enabled,
        imageUrl: imageUrl,
        subMenu: subMenu,
        sortKey: sortKey
      };
    }
  };
}(window.epi = window.epi || {}));

