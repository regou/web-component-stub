(function () {
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
			},
			removed: function () {
			},
			attributeChanged: function (attrName, oldValue, newValue) {
				this.innerHTML = this.format(this.num);
			}
		},
		events: {},
		accessors: {
			num:{
				attribute: {
					validate: function(n){
						return Number(n);
					}
				}
			},
			usek:{
				attribute: {
					validate: function(n){
						return parseInt(n);
					}
				}
			}
		},
		methods: {

			format:function (num,opt) {
				var opt = opt || {
					delimiter:this.getAttribute('delimiter'),
					separator:this.getAttribute('separator'),
					usek:this.usek || null
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

})();
