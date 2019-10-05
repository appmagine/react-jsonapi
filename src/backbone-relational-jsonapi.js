// taken from https://github.com/xbill82/backbone-relational-jsonapi (MIT License)
// modified slightly

/*
The MIT License (MIT)

Copyright (c) 2015 Luca Marchesini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import Backbone from 'backbone';
import 'backbone-relational';
import _ from 'underscore';

var _extend = Backbone.RelationalModel.extend;
Backbone.RelationalModel.extend = function (protoProps, classProps) {
    var ret = _extend.call(this, protoProps, classProps);

    if (protoProps.defaults && protoProps.defaults.type) {
        Backbone.modelFactory.registerModel(ret);
    }

    return ret;
};

var ModelFactory = function() {
	this.registeredModels = {};
};

ModelFactory.prototype.registerModel = function(model) {
	this.registeredModels[model.prototype.defaults.type] = model;
}

ModelFactory.prototype.findOrCreate = function(data) {
	if (this.registeredModels[data.type])
		return this.registeredModels[data.type].findOrCreate(data, {parse: true});
}

ModelFactory.prototype.createFromArray = function(items) {
	_.each(items, function(item) {
		this.findOrCreate(item);
	}, this);
};

Backbone.modelFactory = new ModelFactory();

Backbone.Collection.prototype.parse = function(response) {
	if (!response)
		return;

	if (response.included)
		Backbone.modelFactory.createFromArray(response.included);

	if (response.meta && this.handleMeta)
		this.handleMeta(response.meta);

	if (!response.data) {
		return response;
	}


	return response.data;
};

Backbone.RelationalModel.prototype.parse = function(response) {
	if (!response)
		return;

	if (response.included)
		Backbone.modelFactory.createFromArray(response.included);

	if (response.data) {
		response = response.data;
	}

	if (response.meta && this.handleMeta)
		this.handleMeta(response.meta);

	var data = response.attributes || {};
	data.id = response.id;

	if (response.relationships) {
		var simplifiedRelations = _.mapObject(response.relationships, function(value) {
			return value.data;
		});

		_.extend(data, simplifiedRelations);
	}

	return data;
};
