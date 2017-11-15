import $ from 'jquery';
import CodeMirror from 'codemirror';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/lib/codemirror.css';

import './main';

var texts = {};

var editor = CodeMirror.fromTextArea($("#codemirror")[0], {
    value: '',
    mode: 'jsx'
});
editor.setSize(null, 400);

var active;
$("#menu a").click(function (e) {
    if (active) {
        active.toggleClass('active');
    }
    e.preventDefault();
    var $a = $(e.target);
    var file = $a[0].innerHTML;
    $a.addClass('active');
    $a.blur();
    active = $a;
    if (!texts[file]) {
        $.ajax({
            url: "/examples/" + file,
            dataType: 'text'
        }).done(function (data) {
            texts[file] = data;
            editor.getDoc().setValue(data);
        });
    } else {
        editor.getDoc().setValue(texts[file]);
    }
});

$("#default").click();
