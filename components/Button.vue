<template>
  <v-btn>
    Button
  </v-btn>
</template>

<style scoped>

.v-btn{
  border-radius: 5px;
  box-shadow: none !important;
}

.v-btn--variant-elevated{
  background: rgba(var(--v-theme-background-action), 0.2);
}

.v-btn--variant-accept{
  background: rgb(var(--v-theme-action-primary));
  border: 1px solid rgb(var(--v-theme-border-primary));
}

.v-btn--variant-outlined{
  border: 1px solid rgb(var(--v-theme-border-primary));
}
</style>