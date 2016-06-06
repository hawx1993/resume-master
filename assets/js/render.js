///**
// * Created by trigkit4 on 16/6/6.
// */
'use strict';
var page = require('webpage').create();
var address = 'build/index.html';
var output = 'resume.pdf';

page.viewportSize = {
    width: '210mm',
    height: '297mm'
};

page.paperSize = {
    format: 'A4',
    orientation: 'portrait',
    margin: '0px'
};


page.open(address, function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit(1);
    } else {
        window.setTimeout(function () {
            page.render(output);
            phantom.exit();
        }, 200);
    }
});

