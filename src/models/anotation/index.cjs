const AnoMod = require('./anotation.module.tsx')

const Insert = async (body) => {
    return await AnoMod.create(body)
}

const Get = async () => {
    return await AnoMod.find().sort({
        fav: -1,
    })
}

const Patch = async (body) => {
    return await AnoMod.findOneAndUpdate({
        _id: body.id
    },
    {
        title: body.title,
        body: body.body,
        fav: body.fav
    },
{
    new: true
})
}

const PatchC = async (body) => {
    return await AnoMod.findOneAndUpdate({
        _id: body.id
    },{
        color: body.color
    },{
        new: true
    })
}

const Del = async (id) => {
    return await AnoMod.findOneAndDelete({
        _id: id
    })
}

module.exports = { Insert, Get, Patch, Del }