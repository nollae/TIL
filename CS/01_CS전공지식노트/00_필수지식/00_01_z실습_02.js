/**
 * JSON 실습 2
 * 이름 : 제니
 * 좋아하는 것 : 블랙핑크, 강아지
 *  블랙핑크 : 핑크베놈, 핑크
 *  강아지 : 포메라니안
 */

const _json = {
    "name" : "jennie",
    "like" : {
        "blackpink" : {
            "name" : "pinkvenom",
            "color" : "pink" 
        },
        "dog": {
            "type" : "pomeranian"
        }
    }
} 

console.log(_json.name);
console.log(_json.like.blackpink);
console.log(_json.like.dog.type);