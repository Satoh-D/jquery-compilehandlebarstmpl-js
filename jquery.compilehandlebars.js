/**
 * jQuery CompileHandlebarsTmpl JS
 *
 *
 * @category    jQuery Plugin
 * @license     http://www.opensource.org/licenses/mit-license.html  MIT License
 * @copyright   2014 Sato Daiki
 * @author      Daiki Sato <sato.dik@gmail.com>
 * @link        http://orememo-v2.tumblr.com/
 * @version     1.0
 * @since       2014.06.11
 */

;(function($, window, document, undefined) {

	var pluginName = 'compilehandlebarstmpl',
			defaults = {
				jsonURL: '',
				tmplSrc: '#tmplSrc',
				getDataType: 'jsonp',
				getDataOpts: {},
				helpers: {}
			};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype.init = function() {
		var self = this;

		self.$element = $(self.element);
		self.$tmpl = $(self.settings.tmplSrc);

		// エラーチェック
		if(self.$tmpl.length < 1) throw new Error('テンプレートが見つかりません');

		// ヘルパー登録
		if(self.settings.helpers.length > 0) registerHelpers(self.settings.helpers);

		// RSS取得
		$.when(self.getRSS()).then(
			function() { self.compileData(); },
			function() { throw new Error(self.textStatus); }
		);
	}

	Plugin.prototype.compileData = function() {
		var self = this;
				tmplData = Handlebars.compile(self.$tmpl.html());
				compileData = tmplData(self.getData);

		self.$element.append(compileData);
	}

	Plugin.prototype.getRSS = function() {
		var self = this,
				$dfd = $.Deferred();

		$.ajax({
			url: self.settings.jsonURL,
			data: self.settings.getDataOpts,
			dataType: self.settings.getDataType,
			success: function(data) {
				self.getData = data;
				$dfd.resolve();
			},
			error: function(jqXHR, textStatus, errotThrown) {
				self.textStatus = textStatus;
				$dfd.reject();
			}
		});

		return $dfd.promise();
	}

	function registerHelpers(helpers) {
		for(var i = 0; i < helpers.length; i++) {
			var helper = helpers[i];

			Handlebars.registerHelper(helper.helperName, helper.helperFunc);
		}
	}

	$.fn[pluginName] = function(options) {
		this.each(function() {
			if(!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});

		return this;
	}

})(jQuery, window, document, undefined);