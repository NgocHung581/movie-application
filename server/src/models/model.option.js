const modelOptions = {
    toJSON: {
        virtuals: true,
        transform: (_, obj) => {
            delete obj._id;
            return obj;
        },
    },
    toJSON: {
        virtuals: true,
        transform: (_, obj) => {
            delete obj._id;
            return obj;
        },
    },
    versionKey: false,
    timestamps: true,
};

export default modelOptions;
