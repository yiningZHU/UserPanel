var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Property = (function () {
    function Property(name, value) {
        this.name = name;
        this.value = value;
        //this.isRate = isRate;
    }
    var d = __define,c=Property,p=c.prototype;
    p.getDescription = function () {
        return this.name + ": + " + this.value;
    };
    return Property;
}());
egret.registerClass(Property,'Property');
var Properties = (function () {
    function Properties() {
        this.all = [new Property("攻击", 100)];
    }
    var d = __define,c=Properties,p=c.prototype;
    p.getAtkDescription = function () {
        return this.atk.getDescription();
    };
    p.getDefDescription = function () {
        return this.def.getDescription();
    };
    p.getProperty = function (propertyName) {
        return this.all[propertyName];
    };
    return Properties;
}());
egret.registerClass(Properties,'Properties');
var PropertyName;
(function (PropertyName) {
    PropertyName[PropertyName["STR"] = 0] = "STR";
    PropertyName[PropertyName["CON"] = 1] = "CON";
    PropertyName[PropertyName["DEX"] = 2] = "DEX";
    PropertyName[PropertyName["MAG"] = 3] = "MAG";
    PropertyName[PropertyName["SPD"] = 4] = "SPD";
})(PropertyName || (PropertyName = {}));
var PropertiesDisplayUtils = (function () {
    function PropertiesDisplayUtils() {
    }
    var d = __define,c=PropertiesDisplayUtils,p=c.prototype;
    PropertiesDisplayUtils.createAllPropertiesDecription = function (properties) {
        var container = new egret.DisplayObjectContainer();
        for (var _i = 0, _a = properties.all; _i < _a.length; _i++) {
            var p = _a[_i];
            var tf = new egret.TextField();
            tf.text = PropertiesDisplayUtils.getDescription(p);
            container.addChild(tf);
        }
        return container;
    };
    PropertiesDisplayUtils.getDescription = function (property, color) {
        if (property.isRate) {
            var textColor = property.value >= 500 ? "red" : "green";
            return property.name + ": +<red>" + (property.value / 10).toFixed(2);
        }
        else {
            return property.name + ": + " + property.value;
        }
    };
    return PropertiesDisplayUtils;
}());
egret.registerClass(PropertiesDisplayUtils,'PropertiesDisplayUtils');
var User = (function () {
    // pet: pet;
    function User(name) {
        this.cash = 0;
        this.gold = 0;
        this.exp = 0;
        this.totalExp = 0;
        this.level = 1;
        this.heros = [];
        this._herosInTeam = [];
        this.name = name;
    }
    var d = __define,c=User,p=c.prototype;
    d(p, "herosInTeam"
        ,function () {
            return this.heros.filter(function (hero) { return hero.isInTeam; });
        }
    );
    //@Cache
    p.getFightPower = function () {
        var result = 0;
        this.herosInTeam.map(function (hero) { return result += hero.getFightPower(); });
        // result += this.pet.getFightPower();
        return result;
    };
    p.changeHeroTeam = function (heroToUp, heroToDown) {
    };
    p.mountEquipment = function (equip, hero) {
        //User.packages.remove(equip);       //单例
        hero.mount(equip);
    };
    return User;
}());
egret.registerClass(User,'User');
var Package = (function () {
    function Package() {
    }
    var d = __define,c=Package,p=c.prototype;
    return Package;
}());
egret.registerClass(Package,'Package');
var qualityType;
(function (qualityType) {
    qualityType[qualityType["C"] = 0] = "C";
    qualityType[qualityType["B"] = 1] = "B";
    qualityType[qualityType["A"] = 2] = "A";
    qualityType[qualityType["S"] = 3] = "S";
    qualityType[qualityType["SS"] = 4] = "SS";
})(qualityType || (qualityType = {}));
var equipmentType;
(function (equipmentType) {
    equipmentType[equipmentType["weapon"] = 0] = "weapon";
    equipmentType[equipmentType["cloth"] = 1] = "cloth";
    equipmentType[equipmentType["accessorie"] = 2] = "accessorie";
})(equipmentType || (equipmentType = {}));
var occupationType;
(function (occupationType) {
})(occupationType || (occupationType = {}));
var Hero = (function () {
    function Hero(name, str, con, dex, mag, spd, quality) {
        this.isInTeam = false;
        this.equipments = [];
        this.level = 1;
        this.curHP = new Property("当前血量", null);
        this._maxHP = new Property("最大血量", null);
        this._ATK = new Property("伤害", null);
        this._CRIT = new Property("暴击", null);
        this._EV = new Property("闪避", null);
        this._HIT = new Property("命中", null);
        this.name = name;
        this.STR = new Property("力量", str);
        this.CON = new Property("体力", con);
        this.DEX = new Property("技巧", dex);
        this.MAG = new Property("魔力", mag);
        this.SPD = new Property("速度", spd);
        this.quality = new Property("成长", quality);
        this.heroInformationUpdate();
    }
    var d = __define,c=Hero,p=c.prototype;
    p.mount = function (equip) {
    };
    p.equip = function (equipment) {
        this.equipments.push(equipment);
        this.heroInformationUpdate();
    };
    d(p, "maxHp"
        ,function () {
            return this.CON.value * 10;
        }
    );
    d(p, "HIT"
        ,function () {
            return this.DEX.value * 7 + this.SPD.value * 2;
        }
    );
    d(p, "CRIT"
        ,function () {
            return this.DEX.value * 11;
        }
    );
    d(p, "EV"
        ,function () {
            return this.DEX.value * 5 + this.SPD.value * 7;
        }
    );
    d(p, "ATK"
        ,function () {
            var result = 0;
            this.equipments.forEach(function (e) { return result += e._attack; });
            result += this.STR.value * 3 + this.MAG.value * 2;
            return result;
        }
    );
    d(p, "fightPower"
        ,function () {
            return this.getFightPower();
        }
    );
    p.getFightPower = function () {
        return this._ATK.value * 5 + this.SPD.value * 4 + this.STR.value * 10 + this.MAG.value * 8 + this.CON.value * 6 + this.DEX.value * 11;
    };
    p.heroInformationUpdate = function () {
        var _this = this;
        this.equipments.forEach(function (e) { return _this.STR.value += e.STR; });
        this.equipments.forEach(function (e) { return _this.CON.value += e.CON; });
        this.equipments.forEach(function (e) { return _this.DEX.value += e.DEX; });
        this.equipments.forEach(function (e) { return _this.MAG.value += e.MAG; });
        this.equipments.forEach(function (e) { return _this.SPD.value += e.SPD; });
        this._ATK.value = this.ATK;
        this._CRIT.value = this.CRIT;
        this._EV.value = this.EV;
        this._HIT.value = this.HIT;
        this._maxHP.value = this.maxHp;
        this.curHP.value = this._maxHP.value;
    };
    __decorate([
        logger
    ], p, "maxHp", null);
    __decorate([
        logger
    ], p, "HIT", null);
    __decorate([
        logger
    ], p, "CRIT", null);
    __decorate([
        logger
    ], p, "EV", null);
    return Hero;
}());
egret.registerClass(Hero,'Hero');
var Equipment = (function () {
    function Equipment(name, type, atk, runes) {
        //jewels: jewel[] = [];
        this.STR = 0; //力量
        this.CON = 0; //体力
        this.DEX = 0; //技巧
        this.MAG = 0; //魔力
        this.SPD = 0; //速度
        this.runes = [];
        this.name = name;
        this.equipmentType = type;
        this._attack = atk;
        this.runes = runes;
        this.equipmentUpdate();
    }
    var d = __define,c=Equipment,p=c.prototype;
    p.equipmentUpdate = function () {
        var _this = this;
        this.runes.forEach(function (e) { return _this.STR += e.STR; });
        this.runes.forEach(function (e) { return _this.CON += e.CON; });
        this.runes.forEach(function (e) { return _this.DEX += e.DEX; });
        this.runes.forEach(function (e) { return _this.SPD += e.SPD; });
        this.runes.forEach(function (e) { return _this.MAG += e.MAG; });
    };
    return Equipment;
}());
egret.registerClass(Equipment,'Equipment');
// class jewel {
// }
var rune = (function () {
    function rune(quality) {
        this.STR = 0; //力量
        this.CON = 0; //体力
        this.DEX = 0; //技巧
        this.MAG = 0; //魔力
        this.SPD = 0; //速度
        this.quality = quality;
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                this.STR += Math.floor(Math.random() * 12) * this.quality;
                break;
            case 1:
                this.CON += Math.floor(Math.random() * 12) * this.quality;
                break;
            case 2:
                this.DEX += Math.floor(Math.random() * 12) * this.quality;
                break;
            case 3:
                this.MAG += Math.floor(Math.random() * 12) * this.quality;
                break;
            case 4:
                this.SPD += Math.floor(Math.random() * 12) * this.quality;
                break;
        }
    }
    var d = __define,c=rune,p=c.prototype;
    return rune;
}());
egret.registerClass(rune,'rune');
// class pet {
//     getFightPower() {
//         return 200;
//     }
// }
var logger = function (target, propertykey, desc) {
    var getter = desc.get;
    desc.get = function n() {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i - 0] = arguments[_i];
        }
        return getter.apply(this, arg);
    };
    return;
};
var Cache = function (target, propertykey, desc) {
    var method = desc.value;
    desc.velue = function () {
        var arg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arg[_i - 0] = arguments[_i];
        }
        var cacheKey = "_cache" + propertykey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this, arg);
        }
        return target[cacheKey];
    };
};
// var arr: Hero[] = [];
// function test(hero: Hero) {
//     return true;
// }
// var is_every_hero_in_team = arr.every(hero => hero.isInTeam)
//# sourceMappingURL=User.js.map