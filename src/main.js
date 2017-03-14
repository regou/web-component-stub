(function (root, factory) {
	if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
		// CommonJS
		factory(exports, require('x-tag/dist/x-tag-core.min'));
	}else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['exports', 'x-tag'], factory);
	} else {
		// Browser globals
		factory((root.commonJsStrict = {}), root.xtag);
	}
}(this, function (exports, xtag) {

	"use strict";

	function humanize (n, options){
		options = options || {};
		var d = options.delimiter || ',';
		var s = options.separator || '.';
		n = n.toString().split('.');
		n[0] = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + d);
		return n.join(s);
	}


	xtag.register('x-num', {
		lifecycle: {
			created: function () {
			},
			inserted: function () {
				this.innerHTML = this.format(this.num);
				this.updateClassName();
			},
			removed: function () {
			},
			attributeChanged: function (attrName, oldValue, newValue) {
				this.innerHTML = this.format(this.num);
				this.updateClassName();
			}
		},
		events: {},
		accessors: {
			num:{
				attribute: {}
			},
			usek:{
				attribute: {}
			}
		},
		methods: {
			updateClassName:function () {
				let act = Number(this.num) ? 'remove':'add';
				this.classList[act]('x-num-zero-num');
			},
			format:function (num,opt) {
				var num = Number(num);
				var opt = opt || {
						delimiter:this.getAttribute('delimiter'),
						separator:this.getAttribute('separator'),
						usek:this.usek!==null ? parseInt(this.usek) : null
					};
				//{ delimiter: '.', separator: ',', usek:1 }

				function getNumPart() {
					return (num/1000).toFixed(opt.usek);
				}

				if(opt.usek !== null && num >= 10000){
					return humanize(getNumPart(num),opt) + 'k'
				}else{
					return humanize(num,opt);
				}

			}
		}
	});

}));
