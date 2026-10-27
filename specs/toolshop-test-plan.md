# Plano de Testes - Toolshop (Practice Software Testing)

## Application Overview

Plano funcional para a aplicação de demonstração Toolshop em https://practicesoftwaretesting.com/. A inspeção confirmou a loja/catálogo, filtros e ordenação, detalhe de produto, favoritos/comparação, carrinho e checkout por etapas, login, cadastro, recuperação de senha e formulário de contato. Executar cada cenário em contexto de navegador independente e estado inicial limpo. Usar exclusivamente contas e dados sintéticos autorizados; não finalizar compras nem criar contas persistentes sem ambiente/conta de teste e autorização para limpeza.

## Test Scenarios

### 1. Catálogo e navegação de produtos

**Seed:** `tests/seed.spec.ts`

#### 1.1. Exibir página inicial e controles principais da loja

**File:** `tests/catalog/storefront.spec.ts`

**Steps:**
  1. Abrir a URL base configurada em uma sessão sem cookies ou armazenamento persistido.
    - expect: A página inicial do Toolshop é exibida.
    - expect: O título identifica Practice Software Testing - Toolshop.
    - expect: Os controles de busca, ordenação, faixa de preço, categorias, marcas e sustentabilidade estão disponíveis.
  2. Inspecionar a área de catálogo e os controles de navegação.
    - expect: Os produtos aparecem em cartões com nome e preço quando disponíveis.
    - expect: A paginação e a navegação principal estão visíveis.

#### 1.2. Pesquisar produtos por termo

**File:** `tests/catalog/search.spec.ts`

**Steps:**
  1. Abrir a página inicial e preencher o campo Search com um termo correspondente a um produto visível, por exemplo, Hammer.
    - expect: O campo mantém o termo digitado.
  2. Acionar a busca pelo botão Search ou pela tecla Enter.
    - expect: A lista é atualizada para apresentar produtos compatíveis com o termo.
    - expect: A busca não apresenta produtos sem relação com o termo, conforme comportamento do catálogo.
  3. Substituir o termo por um texto sem correspondência.
    - expect: A página apresenta estado vazio ou mensagem informativa, sem erro inesperado.

#### 1.3. Filtrar e ordenar produtos

**File:** `tests/catalog/filters-and-sort.spec.ts`

**Steps:**
  1. Na página inicial, selecionar uma categoria disponível, como Hand Tools.
    - expect: A seleção do filtro é indicada na interface.
    - expect: A listagem apresenta apenas produtos da categoria selecionada.
  2. Limpar o filtro de categoria e selecionar uma marca disponível.
    - expect: Os produtos exibidos correspondem à marca escolhida.
  3. Ativar Show only eco-friendly products.
    - expect: A lista é restringida a produtos identificados como eco-friendly.
  4. Selecionar uma opção do controle Sort.
    - expect: Os produtos são reordenados segundo a opção escolhida.
    - expect: O controle mantém a opção selecionada.
  5. Remover os filtros aplicados.
    - expect: A listagem volta a exibir produtos sem os filtros anteriores.

#### 1.4. Navegar entre páginas do catálogo

**File:** `tests/catalog/pagination.spec.ts`

**Steps:**
  1. Abrir a página inicial e selecionar uma página diferente na paginação.
    - expect: A página selecionada passa a ser a ativa.
    - expect: A lista é atualizada e apresenta produtos daquela página.
  2. Usar o controle de próxima página e, em seguida, voltar à página anterior.
    - expect: Os controles de navegação alteram a página corretamente.
    - expect: A página e o conteúdo exibidos permanecem coerentes.

#### 1.5. Consultar detalhes e disponibilidade de produto

**File:** `tests/catalog/product-details.spec.ts`

**Steps:**
  1. Abrir um produto disponível a partir da listagem.
    - expect: A página de detalhes apresenta o nome, o preço e as informações do produto.
    - expect: O seletor Quantity inicia com valor 1.
    - expect: Os controles Add to cart, Add to favourites e Compare estão disponíveis.
  2. Abrir, em um cenário separado, um item marcado Out of stock na listagem.
    - expect: A indisponibilidade é indicada claramente.
    - expect: A ação de adicionar ao carrinho não permite adicionar o item indisponível.

### 2. Carrinho e checkout

**Seed:** `tests/seed.spec.ts`

#### 2.1. Adicionar produto disponível ao carrinho

**File:** `tests/cart/cart.spec.ts`

**Steps:**
  1. Abrir um produto disponível e adicionar uma unidade ao carrinho.
    - expect: A quantidade indicada no ícone do carrinho aumenta para 1.
    - expect: O produto é adicionado sem sair da loja de forma inesperada.
  2. Abrir o carrinho pelo ícone de navegação.
    - expect: O carrinho lista o produto, quantidade, preço unitário e total.
    - expect: O total corresponde à soma dos itens.

#### 2.2. Atualizar quantidade e total do carrinho

**File:** `tests/cart/cart.spec.ts`

**Steps:**
  1. Adicionar um produto disponível ao carrinho e abrir /checkout.
    - expect: O produto e a quantidade inicial aparecem na tabela do carrinho.
  2. Alterar a quantidade do item para 2.
    - expect: A quantidade é atualizada.
    - expect: O subtotal e o total são recalculados com base na quantidade.
  3. Tentar informar quantidade zero ou negativa.
    - expect: A aplicação rejeita ou corrige a quantidade inválida e não apresenta total negativo.

#### 2.3. Remover produto e tratar carrinho vazio

**File:** `tests/cart/cart.spec.ts`

**Steps:**
  1. Adicionar um produto ao carrinho e abrir /checkout.
    - expect: O produto aparece no carrinho.
  2. Remover o item usando o controle correspondente.
    - expect: O item deixa de aparecer.
    - expect: O estado de carrinho vazio é exibido e o total é atualizado para zero ou removido.

#### 2.4. Validar etapa do carrinho e opção de checkout como visitante

**File:** `tests/cart/checkout.spec.ts`

**Steps:**
  1. Adicionar um produto disponível e prosseguir pelo botão Proceed to checkout da etapa Cart.
    - expect: A etapa Sign in é exibida.
    - expect: As opções Sign in e Continue as Guest estão disponíveis.
  2. Selecionar Continue as Guest.
    - expect: São exibidos os campos obrigatórios Email address, First name e Last name.
  3. Tentar continuar sem preencher os dados obrigatórios.
    - expect: A etapa não avança.
    - expect: Os campos obrigatórios são indicados para correção.
  4. Preencher os campos com dados sintéticos válidos e continuar.
    - expect: O fluxo avança para Billing Address.
    - expect: Nenhuma compra é finalizada nesta etapa do teste.

#### 2.5. Bloquear avanço no checkout com carrinho vazio

**File:** `tests/cart/checkout.spec.ts`

**Steps:**
  1. Abrir /checkout em contexto limpo, sem itens no carrinho.
    - expect: O estado vazio do carrinho é apresentado.
    - expect: Não é possível avançar para login, endereço ou pagamento sem um item.

### 3. Autenticação e cadastro

**Seed:** `tests/seed.spec.ts`

#### 3.1. Exibir formulário de login

**File:** `tests/auth/login.spec.ts`

**Steps:**
  1. Abrir /auth/login em sessão limpa.
    - expect: O título da página identifica Login.
    - expect: Os campos Email address e Password, o botão Login e os links de cadastro e recuperação de senha estão visíveis.

#### 3.2. Validar campos obrigatórios e formato de e-mail no login

**File:** `tests/auth/login.spec.ts`

**Steps:**
  1. Abrir /auth/login e pressionar Login sem preencher os campos.
    - expect: A autenticação não ocorre.
    - expect: Os campos obrigatórios são indicados e a página permanece no login.
  2. Informar um e-mail malformado e uma senha sintética, depois pressionar Login.
    - expect: O formato inválido é rejeitado ou sinalizado.
    - expect: O usuário permanece na página de login sem autenticação.

#### 3.3. Rejeitar credenciais inválidas

**File:** `tests/auth/login.spec.ts`

**Steps:**
  1. Abrir /auth/login e informar um endereço de e-mail sintético válido, mas não registrado, junto com uma senha incorreta.
    - expect: O login é rejeitado com mensagem compreensível.
    - expect: A página não revela se somente o e-mail ou somente a senha está incorreto.
    - expect: Nenhuma sessão autenticada é criada.

#### 3.4. Entrar com conta de teste autorizada

**File:** `tests/auth/login.spec.ts`

**Steps:**
  1. Abrir /auth/login e preencher as credenciais válidas de uma conta de teste fornecida de forma segura pelo ambiente.
    - expect: Os campos aceitam as credenciais sem expor a senha em texto claro.
  2. Pressionar Login.
    - expect: O usuário é autenticado e redirecionado para uma área protegida ou para o fluxo de checkout, conforme o ponto de entrada.
    - expect: A navegação autenticada permanece funcional.

#### 3.5. Validar campos obrigatórios do cadastro

**File:** `tests/auth/register.spec.ts`

**Steps:**
  1. Abrir /auth/register em estado limpo e tentar registrar sem preencher os campos obrigatórios.
    - expect: O cadastro não é realizado.
    - expect: Os campos obrigatórios são indicados para correção.
  2. Inspecionar os campos disponíveis: nome, sobrenome, data de nascimento, país, código postal, número, rua, cidade, estado, telefone, e-mail e senha.
    - expect: Os rótulos e indicações de obrigatoriedade são compreensíveis.
    - expect: O seletor de país oferece opções e o controle de data aceita o formato indicado YYYY-MM-DD.

#### 3.6. Rejeitar dados inválidos no cadastro

**File:** `tests/auth/register.spec.ts`

**Steps:**
  1. Preencher /auth/register com e-mail malformado, data de nascimento em formato inválido e outros campos obrigatórios sintéticos válidos.
    - expect: Os dados inválidos são sinalizados.
    - expect: O formulário não cria a conta nem avança até os erros serem corrigidos.

#### 3.7. Validar solicitação de recuperação de senha

**File:** `tests/auth/forgot-password.spec.ts`

**Steps:**
  1. Abrir /auth/forgot-password e enviar o formulário sem e-mail.
    - expect: A solicitação não é processada.
    - expect: O campo Email address é indicado como obrigatório.
  2. Preencher um endereço malformado e selecionar Set New Password.
    - expect: O formato inválido é rejeitado ou sinalizado.
  3. Preencher e enviar um endereço sintético válido.
    - expect: A aplicação exibe uma confirmação genérica sem revelar se a conta existe.
    - expect: Nenhuma senha ou token é exposto na página.

### 4. Contato

**Seed:** `tests/seed.spec.ts`

#### 4.1. Validar campos obrigatórios do formulário de contato

**File:** `tests/contact/contact.spec.ts`

**Steps:**
  1. Abrir /contact e selecionar Send sem preencher os campos.
    - expect: A mensagem não é enviada.
    - expect: Os campos obrigatórios são identificados para correção.
  2. Inspecionar o controle Subject e suas opções.
    - expect: As opções Customer service, Webmaster, Return, Payments, Warranty e Status of my order estão disponíveis.

#### 4.2. Enviar mensagem de contato válida

**File:** `tests/contact/contact.spec.ts`

**Steps:**
  1. Preencher nome, sobrenome, e-mail, assunto e mensagem usando dados sintéticos autorizados.
    - expect: Os campos aceitam os valores informados e o assunto selecionado permanece visível.
  2. Selecionar Send.
    - expect: Uma confirmação de envio é exibida.
    - expect: A mensagem não é duplicada por um único envio.

#### 4.3. Rejeitar formato inválido no contato

**File:** `tests/contact/contact.spec.ts`

**Steps:**
  1. Abrir /contact, preencher os campos obrigatórios com dados sintéticos e informar e-mail malformado.
    - expect: O formato de e-mail inválido é indicado.
    - expect: O formulário não apresenta confirmação de envio.
