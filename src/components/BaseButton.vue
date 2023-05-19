<template>
    <button>
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    text-decoration: none;
    display: inline-block;
    padding: 8px 16px;
    margin-bottom: 15px;
    border: 1px solid;
    border-radius: 5px;
}

button:hover {
    background-color: #ddd;
    border: 1px solid black;
    color: black;
    cursor: pointer;

}
</style>