/**
 * CharacterFactory is a class that creates characters in the game.
 */
class CharacterFactory {

    /**
     * Loads a character from local storage.
     *
     * @param {string} theCharacterType - The type of the character to load.
     */
    static loadCharacter(theCharacterType) {

    }

    /**
     * Creates a new character.
     *
     * @param {string} characterType - The type of the character to create.
     * @returns {Object} The created character.
     */
    static createCharacter(characterType) {
        let character = null;
        switch(characterType) { //later add name as a param
            case 'assassin':
                let assassinData = JSON.parse(window.localStorage.getItem('assassin'));
                character = new Assassin({
                    thePos: createVector(assassinData.thePos.x, assassinData.thePos.y),
                    theSize: createVector(assassinData.theSize.x, assassinData.theSize.y),
                    theImage: TILEMAP_ASSASSIN,
                    theHFrames: assassinData.theHFrames,
                    theVFrames: assassinData.theVFrames,
                    theFrame: assassinData.theFrame,
                    theFrameSize: createVector(assassinData.theFrameSize.x, assassinData.theFrameSize.y),
                    theOffset: createVector(assassinData.theOffset.x, assassinData.theOffset.y),
                    theName: assassinData.theName,
                    theHitPoints: assassinData.theHitPoints,
                    theAttack: new Attack(assassinData.theAttack.damage, assassinData.theAttack.hitChance),
                    theStamina: assassinData.theStamina,
                    theBlockPercentage: assassinData.theBlockPercentage,
                    theMaxHitPoints: assassinData.theMaxHitPoints,
                    theSpecialAttack: new Attack(assassinData.theSpecialAttack.damage, assassinData.theSpecialAttack.hitChance),
                    theAnimation: new Animations({
                        stand: new FramePattern(ANIM_STAND),
                        walk: new FramePattern(ANIM_WALK),
                    }),
                })
                break;
            case 'warrior':
                let warriorData = JSON.parse(window.localStorage.getItem('warrior'));
                character = new Warrior({
                    thePos: createVector(warriorData.thePos.x, warriorData.thePos.y),
                    theSize: createVector(warriorData.theSize.x, warriorData.theSize.y),
                    theIsCollideable: warriorData.theIsCollideable,
                    theImage: TILEMAP_WARRIOR,
                    theHFrames: warriorData.theHFrames,
                    theVFrames: warriorData.theVFrames,
                    theFrame: warriorData.theFrame,
                    theFrameSize: createVector(warriorData.theFrameSize.x, warriorData.theFrameSize.y),
                    theOffset: createVector(warriorData.theOffset.x, warriorData.theOffset.y),
                    theName: warriorData.theName,
                    theHitPoints: warriorData.theHitPoints,
                    theAttack: new Attack(warriorData.theAttack.damage, warriorData.theAttack.hitChance),
                    theStamina: warriorData.theStamina,
                    theBlockPercentage: warriorData.theBlockPercentage,
                    theMaxHitPoints: warriorData.theMaxHitPoints,
                    theSpecialAttack: new Attack(warriorData.theSpecialAttack.damage, warriorData.theSpecialAttack.hitChance),
                    theAnimation: new Animations({
                      stand: new FramePattern(ANIM_STAND),
                      walk: new FramePattern(ANIM_WALK),
                    }),
                })
                break;
            case 'priest':
                let priestData = JSON.parse(window.localStorage.getItem('priest'));
                character = new Priest({
                    thePos: createVector(priestData.thePos.x, priestData.thePos.y),
                    theSize: createVector(priestData.theSize.x, priestData.theSize.y),
                    theIsCollideable: priestData.theIsCollideable,
                    theImage: TILEMAP_PRIEST,
                    theHFrames: priestData.theHFrames,
                    theVFrames: priestData.theVFrames,
                    theFrame: priestData.theFrame,
                    theFrameSize: createVector(priestData.theFrameSize.x, priestData.theFrameSize.y),
                    theOffset: createVector(priestData.theOffset.x, priestData.theOffset.y),
                    theName: priestData.theName,
                    theHitPoints: priestData.theHitPoints,
                    theAttack: new Attack(priestData.theAttack.damage, priestData.theAttack.hitChance),
                    theStamina: priestData.theStamina,
                    theBlockPercentage: priestData.theBlockPercentage,
                    theMaxHitPoints: priestData.theMaxHitPoints,
                    theHeal: new Heal(priestData.theHeal.healAmount, priestData.theHeal.healChance),
                    theAnimation: new Animations({
                      stand: new FramePattern(ANIM_STAND),
                      walk: new FramePattern(ANIM_WALK),
                    }),
                })
                break;
            case 'dino':
                let dinoData = JSON.parse(window.localStorage.getItem('dino'));
                character = new Dino({
                    thePos: createVector(dinoData.thePos.x, dinoData.thePos.y),
                    theSize: createVector(dinoData.theSize.x, dinoData.theSize.y),
                    theImage: TILEMAP_DINO,
                    theHFrames: dinoData.theHFrames,
                    theVFrames: dinoData.theVFrames,
                    theFrame: dinoData.theFrame,
                    theFrameSize: createVector(dinoData.theFrameSize.x, dinoData.theFrameSize.y),
                    theOffset: createVector(dinoData.theOffset.x, dinoData.theOffset.y),
                    theName: dinoData.theName,
                    theHitPoints: dinoData.theHitPoints,
                    theAttack: new Attack(dinoData.theAttack.damage, dinoData.theAttack.hitChance),
                    theStamina: dinoData.theStamina,
                    theBlockPercentage: dinoData.theBlockPercentage,
                    theMaxHitPoints: dinoData.theMaxHitPoints,
                    theSpecialAttack: new Attack(dinoData.theSpecialAttack.damage, dinoData.theSpecialAttack.hitChance),
                    theAnimation: new Animations({
                        stand: new FramePattern(ANIM_STAND),
                        walk: new FramePattern(ANIM_WALK),
                    }),
                })
                break;
            default:
                console.log("Invalid character type");
            }
            return character;
        }
    }