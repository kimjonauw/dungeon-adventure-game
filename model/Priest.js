class Priest extends Character {

    myHeal;

    constructor(theHeal) {
        myBasicAttack = new Attack(20, 100);
        myHeal = theHeal;
    }

    basicAttack() {
        return this.myBasicAttack;
    }

    specialAttack() {
        myHitPoints += this.myHeal.healAmount;
    }

    buff() {
        myHeal.setHealAmount(myHeal.getHealAmount() + 25);
    }
}