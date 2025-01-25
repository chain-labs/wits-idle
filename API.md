# API ENDPOINTS

## UNSTAKING

endpoint :- `/unstaking`

method :- `POST`

params :- 
```
{
    "address": string,
    "tokenId": string,
    "stakingTimeInSecs": number
}
```

response :- 
```
    {
        "status": "success",
        "materials": {
            "common": number,
            "uncommon": number,
            "rare": number,
            "legendary": number
            "mythic": number
        }
    }
```

description: This are the materials that user have won by unstaking the nft. This should be generated only after unstaking is completed successfully.

## USER MATERIALS

endpoint :- `/userMaterials/:address`

method :- `GET`

params :- `address` (string)

response :- 
```
    {
        "status": "success",
        "materials": {
            "common": number,
            "uncommon": number,
            "rare": number,
            "legendary": number
            "mythic": number
        }
    }
```

description: This are the materials that user have.

## Reward

endpoint :- `/reward`

method :- `POST`

params :- 
```
{
    "address": string,
    "materials": {
        "common": number,
        "uncommon": number,
        "rare": number,
        "legendary": number
        "mythic": number
    }
}
```

response :- 
```
    {
        "status": "success",
        "message": "Rewards added successfully"
        "data": {
            "rewardImageUrl": string,
            "rewardName": string
        }
    }
```

description: This endpoint is used to add rewards to the usersList.


## User Rewards

endpoint :- `/userRewards/:address`

method :- `GET`

params :- `address` (string)

response :- 
```
    {
        "status": "success",
        "data": [
            {
                "rewardsList": [
                    {
                        "rewardId": string,
                        "rewardImageUrl": string,
                        "rewardName": string,
                        "dateTime": number,
                        "rewardRarity": string
                    }
                ]
            }
        ]
    }
```

description: This are the rewards that user have won.

## SHIPPING

endpoint :- `/shipping`

method :- `POST`

params :- 
```
{
    "address": string,
    "email": string,
    "firstName": string,
    "lastName": string,
    "address": string,
    "country": string,
    "city": string,
    "province": string,
    "postalCode": string,
    "optional": string,
}
```

response :- 
```
    {
        "status": "success",
        "message": "Shipping details added successfully"
    }
```

description: This endpoint is used to add shipping details to the usersList.

