# Word Bucket Plugin

This plugin is responsible for the connection between the database of Word Bucket and your website, which means it'll fill the website with the proper contents.

## Installation

Download and install the plugin:

```
npm install word-bucket-js-sdk
```

## Setup

To use the Word Bucket Plugin simply open the html file which you want to fill with content and place the next line inside the <head> tag:

```
<script src = "**Insert path to the plugin here**" ></script>
```

Next, after the <body> tag is closed, type:

```
<script>
  wordBucket = new WordBucket(a, b, c)
  wordBucket.setLanguage(d);
</script>
```

To conclude the configuration, replace the arguments with the following string values:

* a - access token provided after the login in the Word Bucket website
* b - the id of the website registered in the Word Bucket website
* c - (Optional Argument) url of the database. If left empty, the default will connect to Word Bucket database
* d - General language code. This value will define in which language is the content displayed. If left empty, the default is the browser's language

## Usage

Wherever you wish to show a specific content, place the following line:

```
<message lang="k" key="x" html="y" textLength="z" ></message>
```

Then change the values to the following string values:

* k - (Optional Argument) language in which the content will be displayed. If left empty, default value is the code defined in the setLanguage() function
* x - key of the specific content. It'll be used to obtain the content value of the database
* y - (Optional Argument) defines if the content obtained from the database is to be displayed with html tags that were saved previously or simply the content value. The values range between the strings "true" or "false". If left empty, the default is "false"
* z - (Optional Argument) defines the length of characters of "lorem ipsum" that is displayed in case of inexistent content. The values range between '0' and '998'. If left empty, the default is '0'

In case you wish to obtain a specific message and the usage of the tag "message" does not work, you can work around it by using the function

```
wordBucket.message(x, y, z, k);
```

with the parameters being the same as the ones in the tag "message".

## Language Codes

* English - "gb"
* Portuguese - "pt"

## License

This project is licensed under the MIT License.