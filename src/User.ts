
class Property {

    constructor(name: string, value: number) {

        this.name = name;
        this.value = value;
        //this.isRate = isRate;
    }

    name: string;

    value: number;

    isRate:boolean;

    getDescription() {

        return this.name + ": + " + this.value;

    }

}


class Properties {

    all: Property[] = [new Property( "攻击" , 100 )];

    atk: Property;

    getAtkDescription() {
        return this.atk.getDescription();
    }

    def: Property;

    getDefDescription() {
        return this.def.getDescription();

    }

    getProperty(propertyName: PropertyName) {

        return this.all[propertyName];
    }

}


enum PropertyName {

    STR = 0,

    CON = 1,

    DEX = 2, 

    MAG = 3,

    SPD = 4

}

class PropertiesDisplayUtils {

    static createAllPropertiesDecription(properties: Properties) {
        var container = new egret.DisplayObjectContainer();
        for (var p of properties.all) {
            var tf = new egret.TextField();
            tf.text = PropertiesDisplayUtils.getDescription(p);
            container.addChild(tf);
        }
        return container;
    }

    static getDescription(property: Property, color?) {
        if (property.isRate) {
            var textColor = property.value >= 500 ? "red" : "green";
            return property.name + ": +<red>" + (property.value / 10).toFixed(2);
        }
        else {
            return property.name + ": + " + property.value;
        }
    }

}



class User {

    name: string;

    cash = 0;

    gold = 0;

    exp = 0;

    totalExp = 0;

    level = 1;

    heros: Hero[] = [];

    _herosInTeam: Hero[] = [];

    // pet: pet;

    constructor(name: string) {

        this.name = name;

    }

    get herosInTeam() {
        return this.heros.filter(hero => hero.isInTeam)
    }

    //@Cache

    getFightPower() {

        var result = 0;
        this.herosInTeam.map(hero => result += hero.getFightPower());
        // result += this.pet.getFightPower();
        return result;
    }

    changeHeroTeam(heroToUp, heroToDown) {

    }
    weapons: Equipment;

    mountEquipment(equip: Equipment, hero: Hero) {
        //User.packages.remove(equip);       //单例
        hero.mount(equip);
    }

    packages: Package;
}

class Package {

}

enum qualityType {

    C,
    B,
    A,
    S,
    SS
}

enum equipmentType {

    weapon,
    cloth,
    accessorie

}

enum occupationType {


}


class Hero {

    name: string;

    isInTeam: boolean = false;

    equipments: Equipment[] = [];

    level = 1;

    curHP: Property;   //当前血量

    _maxHP: Property;   //最大血量

    STR: Property;  //力量

    CON: Property;  //体力

    DEX: Property;  //技巧

    MAG: Property;  //魔力

    SPD: Property;  //速度

    quality: Property; //成长品质

    _ATK: Property;  //伤害

    _HIT: Property;  //命中

    _CRIT: Property;  //暴击

    _EV: Property; //闪避

    constructor(name: string, str: number, con: number, dex: number, mag: number, spd: number, quality: number) {
        this.curHP = new Property("当前血量",null);
        this._maxHP = new Property("最大血量",null);
        this._ATK = new Property("伤害",null);
        this._CRIT = new Property("暴击",null);
        this._EV = new Property("闪避",null);
        this._HIT = new Property("命中",null);
        this.name = name;
        this.STR = new Property("力量",str);
        this.CON = new Property("体力",con);
        this.DEX = new Property("技巧",dex);
        this.MAG = new Property("魔力",mag);
        this.SPD = new Property("速度",spd);
        this.quality= new Property("成长",quality);
        this.heroInformationUpdate();

    }

    mount(equip: Equipment) {

    }


    equip(equipment: Equipment) {

        this.equipments.push(equipment);
        this.heroInformationUpdate();

    }
    
    @logger
    get maxHp() {

        return this.CON.value * 10;

    }
    @logger
    get HIT() {

        return this.DEX.value * 7 + this.SPD.value * 2;
    }
    @logger
    get CRIT() {

        return this.DEX.value * 11;

    }
    @logger
    get EV() {
        return this.DEX.value * 5 + this.SPD.value * 7;
    }


    get ATK() {

        var result = 0;
        this.equipments.forEach(e => result += e._attack)
        result += this.STR.value * 3 + this.MAG.value * 2;
        return result;

    }

    get fightPower() {

        return this.getFightPower();

    }

    getFightPower() {

        return this._ATK.value * 5 + this.SPD.value * 4 + this.STR.value * 10 + this.MAG.value * 8 + this.CON.value * 6 + this.DEX.value * 11;
    }

    heroInformationUpdate() {

        this.equipments.forEach(e => this.STR.value += e.STR);
        this.equipments.forEach(e => this.CON.value += e.CON);
        this.equipments.forEach(e => this.DEX.value += e.DEX);
        this.equipments.forEach(e => this.MAG.value += e.MAG);
        this.equipments.forEach(e => this.SPD.value += e.SPD);
        this._ATK.value = this.ATK;
        this._CRIT.value = this.CRIT;
        this._EV.value = this.EV;
        this._HIT.value = this.HIT;
        this._maxHP.value = this.maxHp;
        this.curHP.value = this._maxHP.value;
    }

}

class Equipment {

    //jewels: jewel[] = [];

    STR = 0;  //力量

    CON = 0;  //体力

    DEX = 0;  //技巧

    MAG = 0;  //魔力

    SPD = 0;  //速度

    runes: rune[] = [];

    equipmentType: number;

    name: string;

    _attack: number;

    constructor(name: string, type: number, atk: number, runes: rune[]) {
        this.name = name;
        this.equipmentType = type;
        this._attack = atk;
        this.runes = runes;
        this.equipmentUpdate();
    }

    equipmentUpdate() {

        this.runes.forEach(e => this.STR += e.STR);
        this.runes.forEach(e => this.CON += e.CON);
        this.runes.forEach(e => this.DEX += e.DEX);
        this.runes.forEach(e => this.SPD += e.SPD);
        this.runes.forEach(e => this.MAG += e.MAG);

    }


}

// class jewel {


// }

class rune {

    STR = 0;  //力量

    CON = 0;  //体力

    DEX = 0;  //技巧

    MAG = 0;  //魔力

    SPD = 0;  //速度

    quality: number;

    constructor(quality: number) {

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



}

// class pet {

//     getFightPower() {

//         return 200;

//     }

// }



var logger: MethodDecorator = (target: any, propertykey, desc: PropertyDescriptor) => {
    const getter = desc.get;
    desc.get = function n(...arg) {
        return getter.apply(this, arg);
    }
    return
}

var Cache: MethodDecorator = (target: any, propertykey, desc) => {

    const method = desc.value;

    desc.velue = function (...arg) {

        var cacheKey = "_cache" + propertykey;
        if (!target[cacheKey]) {
            target[cacheKey] = method.apply(this, arg);
        }
        return target[cacheKey];
    }

}

// var arr: Hero[] = [];

// function test(hero: Hero) {

//     return true;

// }

// var is_every_hero_in_team = arr.every(hero => hero.isInTeam)


