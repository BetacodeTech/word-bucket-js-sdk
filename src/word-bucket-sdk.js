class WordBucket {


  constructor(token, site_id, url = "https://wordbucket.api.betacode.tech/api/auth/content/") {
    this.token = token;
    this.site = site_id;
    this.language = navigator.language.split("-")[0];
    if (this.language === "en") {
      this.language = "gb";
    }
    this.key = '';
    this.url = url;
    this.content_list = [];
    this.getContentList();
  }

  setLanguage(lang) {
    this.language = lang;
    this.replaceMessageTags();
  }

  message(key_set, html_flag = false, textLength = 0, lang = null) {
    let lng = lang ? lang : this.language;
    let key = key_set;
    let html = html_flag;
    let loremLength =  textLength;
    var lorem = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
    let content = this.content_list[lng][key] == undefined ? null : this.content_list[lng][key]['value']
    if (content === null && textLength > 0) {
      return lorem.substr(0, textLength);
    } else if (content === null && loremLength == 0) {
      return ;
    }
    else if (html === false) {
      return this.stripTags(content);
    }
    return content;
  }

  stripTags(originalString) {
    var strippedString = originalString.replace(/(<([^>]+)>)/ig, "");
    return strippedString;
  }

  replaceMessageTags() {
    var messages = document.getElementsByTagName("message");
    if (messages.length > 0) {
      for (var i = 0; i < messages.length; i++) {
        let msg = messages[i];
        let lng = msg.getAttribute('lang');
        let key = msg.getAttribute('key');
        let html = Boolean(msg.getAttribute('html'));
        let loremLength = msg.getAttribute('textLength');
        let text_msg = this.message(key, html, loremLength, lng);
        msg.innerHTML = text_msg;
      }
    }
  }

  getContentList() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        this.content_list = JSON.parse(xhttp.response)['data'];
        this.replaceMessageTags();
      }
    }

    xhttp.open("GET", this.url + this.site, false);
    xhttp.setRequestHeader('Authorization', this.token);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', this.url);
    xhttp.send();
  }


}

