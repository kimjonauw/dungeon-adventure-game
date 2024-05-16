class Priest extends Character {
    myHeal;

    constructor({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage, theHeal }) {
        super({ thePos, theSize, theImage, theIsCollideable, theName, theHitPoints, theAttack, theStamina, theBag, theBlockPercentage })
        this.myHeal = theHeal;
    }

    heal() {
        this.myHitPoints += this.myHeal.getHealAmount();
    }

    buff() {
        this.myHeal.setHealAmount(this.myHeal.getHealAmount() + 25);
    }

    getClass() {
        return "Priest";
    }
}