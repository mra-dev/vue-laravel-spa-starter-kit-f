<template>
    <div :class="{
        'code-input-container': true,
        [className]: !!className,
        }"
         dir="ltr"
    >
        <div class="code-input">
            <template v-for="(v, index) in values" :key="index">
                <q-input
                    class="text-center"
                    style="transition: all"
                    color="accent"
                    type="tel"
                    pattern="[0-9]"
                    outlined
                    :style="{
                    width: `${props.fieldWidth}px`,
                    height: `${props.fieldHeight}px`,
                    }"
                    :autofocus="autoFocus && index === autoFocusIndex"
                    :data-id="index"
                    :model-value="v"
                    :ref="
                    (el) => {
                        if (el) inputs[index + 1] = el;
                    }
                    "
                    @update:model-value="onValueChange($event, index + 1)"
                    @focus="onFocus(index + 1)"
                    @blur="onBlur()"
                    @keydown="onKeyDown"
                    :required="props.required"
                    :disable="props.disabled"
                    maxlength="1"
                    no-error-icon
                    :error="props.error"
                />
            </template>
        </div>
    </div>
    {{values.value}}
</template>

<script setup>
import { ref, toRef, onBeforeUpdate } from "vue";

const props = defineProps({
    className: String,
    error: {
        type: Boolean,
        default: false
    },
    fields: {
        type: Number,
        default: 3,
    },
    fieldWidth: {
        type: Number,
        default: 56,
    },
    fieldHeight: {
        type: Number,
        default: 56,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: true,
    }
});

const emit = defineEmits(["change", "complete", "submit"]);

const KEY_CODE = {
    backspace: 8,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    enter: 13,
};

const values = ref([]);
const iRefs = ref([]);
const inputs = ref([]);
const fields = toRef(props, "fields");
const autoFocusIndex = ref(0);
const autoFocus = true;

const initVals = () => {
    let vals;
    if (values.value && values.value.length) {
        vals = [];
        for (let i = 0; i < fields.value; i++) {
            vals.push(values.value[i] || "");
        }
        autoFocusIndex.value =
            values.value.length >= fields.value ? 0 : values.value.length;
    } else {
        vals = Array(fields.value).fill("");
    }
    iRefs.value = [];
    for (let i = 0; i < fields.value; i++) {
        iRefs.value.push(i + 1);
    }
    values.value = vals;
};

const onFocus = (i) => {
    inputs.value[i].select()
    values.value[i - 1] = null
    triggerChange(values.value);
};
const onBlur = () => {
    // triggerChange(values.value);
}

const onValueChange = (e, i) => {
    values.value[i - 1] = e.replace(/[^\d]/gi, "")
    const index = i - 1
    if (values.value[i - 1] === "") {
        return;
    }
    let next;
    const value = values.value[i - 1];
    values.value = Object.assign([], values.value);
    if (value.length > 1) {
        let nextIndex = value.length + index - 1;
        if (nextIndex >= fields.value) {
            nextIndex = fields.value - 1;
        }
        next = iRefs.value[nextIndex];
        const split = value.split("");
        split.forEach((item, i) => {
            const cursor = index + i;
            if (cursor < fields.value) {
                values.value[cursor] = item;
            }
        });
    } else {
        next = iRefs.value[index + 1];
        values.value[index] = value;
    }
    if (next) {
        const element = inputs.value[next];
        element.focus();
        element.select();
    }
    triggerChange(values.value);
};

const onKeyDown = (e) => {
    const index = parseInt(e.target.dataset.id);
    const prevIndex = index - 1;
    const nextIndex = index + 1;
    const prev = iRefs.value[prevIndex];
    const next = iRefs.value[nextIndex];
    switch (e.keyCode) {
        case KEY_CODE.backspace:
            e.preventDefault();
            const vals = [...values.value];
            if (values.value[index]) {
                vals[index] = "";
                values.value = vals;
                triggerChange(vals);
            } else if (prev) {
                vals[prevIndex] = "";
                inputs.value[prev].focus();
                values.value = vals;
                triggerChange(vals);
            }
            break;
        case KEY_CODE.left:
            e.preventDefault();
            if (prev) {
                inputs.value[prev].focus();
            }
            break;
        case KEY_CODE.right:
            e.preventDefault();
            if (next) {
                inputs.value[next].focus();
            }
            break;
        case KEY_CODE.enter:
            e.preventDefault()
            emit('submit')
            break;
        case KEY_CODE.up:
        case KEY_CODE.down:
            e.preventDefault();
            break;
        default:
            // this.handleKeys[index] = true;
            break;
    }
};

const triggerChange = (values = values.value) => {
    const val = values.join("")
    emit("change", val)
    if (val.length >= fields.value) {
        emit("complete", val)
    }
};

initVals();

onBeforeUpdate(() => {
    inputs.value = [];
});
</script>


<style scoped>
.code-input-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
}
.code-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
}
.code-input > input {
    border: solid 1px #a8adb7;
    font-family: "Lato";
    font-size: 20px;
    border-radius: 8px;
    text-align: center;
    transition: 0.2s all ease-in-out;
    color: #525461;
    box-sizing: border-box;
    -webkit-appearance: initial;
}
.code-input > input:focus {
    outline: none;
    border: 1px solid #409CA3;
    caret-color: #409CA3;
}
.title {
    margin: 0;
    height: 20px;
    padding-bottom: 10px;
}
</style>
