class Heal {
    myHealAmount;
    myHealChance;

    constructor(theHealAmount, myHealChance) {
        this.myHealChance = theHealChance;
        this.myHealAmount = theHealAmount;
    }

    getHealAmount() {
        return this.myHealAmount;
    }

    getHealPercentage() {
        return this.myHitPercentage
    }

    setHealAmount(theHealAmount) {
        this.myDamage = theHealAmount;
    }
    
    setHealPercentage(theHealPercentage) {
        this.myHealPercentage = theHealPercentage;
    }
}