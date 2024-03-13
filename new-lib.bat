IF [%1] == [] GOTO :end
call add-example %1
sed -i "s#zod#%1#g" src\routes\+page.server.ts
sed -i -r "s#- Zod#- %1#" src\routes\+page.svelte
sed -i -r "s#(testing ground - )(\w)#\1\u\2#" src\routes\+page.svelte
pnpm i %1
pnpm remove zod

:end