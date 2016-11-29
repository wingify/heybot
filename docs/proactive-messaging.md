### Sending message to a Skype conversation

- Bot server exposes a POST endpoint on `/message` to send any message to any targeted conversation (user or group).


### Parameters in POST body

- `message`: Text message to sent. Can be formatted as markdown. Note: XML angle brackets are prohibited.
- `shared_secret`: A shared token to validate this endpoint user. Can be found in `app.js`.
- `to`: The identifier key for a conversation to target. `addresses.js` maintains a key-to-address mapping for all targetable conversations. To be able to target new conversation, the conversation address needs to be added to that mapping which can be fetched from `session.message.address` key of a message sent from that conversation.

### Example

```
curl -X POST  -H "Content-Type: multipart/form-data;" -F "message=This is my message" -F "shared_secret=value" -F "to=vwofrontendgroup" https://bot-end-point.com/message
```