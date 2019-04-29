## Utilizando git flow

Estaremos usando o git flow em nossos futuros projetos, e para isso nosso time precisa se qualificar com tal ferramenta.

Com este repositório, testaremos comandos e funcionalidades da ferramenta e com isso aprender a usar em um projeto 'real-world'

![image](https://user-images.githubusercontent.com/31391753/56584825-f4f82d00-65b2-11e9-8a03-3a815a58c5e2.png)

---

### Observações importantes:

- Branch master - É a branch que contém código em nível de produção, ou seja, o código mais maduro existente na sua aplicação.

- Branch develop - Branch que contém o código em nível pronto para testes e logo depois deploy. Todas 'branches' de features vão se "juntar" em algum momento a esta branch

- Branches feature/\*\** - São branches que contém os novos recursos (funcionalidades) que serão adicionadados ao projeto em questão.  
  \_OBS: Usar o prefixo *feature/\* para essas branches\_

- Branches **hotfix/\*** - Branches criadas para arrumar bug críticos em produção

- Branches **release/\*** - São branches já testadas e com um nível de confiança maior do que a \*\*develop, e se encontra pronta para ser juntada a master

---

### _Fluxo de trabalho_ (Geral):

1. Criar a branch de feature:  
   \$git flow feature start feature/nome-da-feature

2. Codar a nova funcionalidade normalmente

3. Dar git push para o Github (Ou feature publish)  
   \$git flow feature publish feature/nome-da-feature

4. Ao Finalizar, abrir uma pull request comparando a branch develop com a branch da nova feature

5. Aguarde o code reviewer fazer sua revisão do código  
   _Caso necessário fazer alterações no código, fazer normalmente e dar `git push`_

6. Com a aprovação da pull request (merge), acessar a branch local develop ($git checkout develop) e dar $git pull

7. Voltar para a branch da feature ($git checkout feature/nome-da-feature) e a finalizar com: $git flow feature finish feature/nome-da-feature
