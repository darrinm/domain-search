#!/usr/bin/env node

const dns = require('dns');
const exec = require('child_process').exec;

for (let a of 'abcdefghijklmnopqrstuvwxyz') {
	for (let b of 'abcdefghijklmnopqrstuvwxyz-') {
		for (let c of 'abcdefghijklmnopqrstuvwxyz') {
//			for (let d of chars) {
				const name = a + b + c + '.cc';
				checkAvailable(name, availableName => console.log(availableName));
//			}
		}
	}
}

/*
var prefixes = ["yotta", "zetta", "exa", "peta", "tera", "giga", "mega",
  "kilo", "hecto", "deka", "deci", "centi", "milli", "micro", "nano",
  "pico", "femto", "atto", "zepto", "yocto"];

var units = ["meter", "gram", "second", "ampere", "kelvin", "mole",
  "candela", "radian", "steradian", "hertz", "newton", "pascal", "joule",
  "watt", "colomb", "volt", "farad", "ohm", "siemens", "weber", "henry",
  "lumen", "lux", "becquerel", "gray", "sievert", "katal"];

for (var i=0; i<prefixes.length; i++) {
  for (var j=0; j<units.length; j++) {
    checkAvailable(prefixes[i] + units[j] + ".com", sys.puts);
  }
}
*/

function checkAvailable(name, callback) {
  dns.resolve4(name, (err, addresses) => {
		if (err && err.code === 'ENOTFOUND')
			exec(`whois ${name}`, (error, stdout, stderr) => {
				//console.log(stdout);
				if (stdout.indexOf('No match for') !== -1)
					callback(name);
			})
  });
}
