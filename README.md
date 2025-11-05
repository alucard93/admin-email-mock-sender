# VTEX Email Mock Sender

Uma aplicação VTEX IO para envio de e-mails padrões da VTEX com dados mockados através de uma interface administrativa moderna.

## 🚀 Instalação Rápida

Para instalar a aplicação diretamente na sua conta VTEX sem precisar clonar o repositório:

```bash
vtex install corebiz.admin-email-mock-sender
```

Após a instalação, acesse o aplicativo em:
- **Admin VTEX** → **Apps** → **Corebiz Email Mock Sender**
- Ou diretamente: `https://seu-account.myvtex.com/admin/apps/corebiz.admin-email-mock-sender/`

> 💡 **Dica:** A aplicação é **100% gratuita** e não requer nenhuma configuração adicional!

## 📧 Funcionalidades

### Tela de Envio de E-mails
- **Templates pré-definidos**: tipos de e-mails padrões da VTEX
  - Chave de Acesso
  - Confirmação de pedido
### Dados Mockados Automáticos
- **Geração automática**: Dados realistas gerados automaticamente com Faker.js
- **Informações do cliente**: Nome, e-mail, endereço
- **Dados do pedido**: ID, valor, produtos, código de rastreamento
- **Produtos simulados**: Lista de produtos com preços e quantidades

### Funcionalidades Avançadas
- **Preview de e-mail**: Visualização antes do envio
- **Histórico de envios**: Tabela com todos os e-mails enviados
- **Status de entrega**: Acompanhamento do status de cada e-mail
- **Validação de formulário**: Campos obrigatórios e validações
- **Feedback visual**: Toasts de sucesso e erro
- **Loading states**: Indicadores de carregamento durante envio

## 🛠️ Tecnologias

- **VTEX IO**: Plataforma de desenvolvimento
- **Admin-UI**: Sistema de design da VTEX
- **TypeScript**: Linguagem de programação
- **React**: Biblioteca de interface
- **React Intl**: Internacionalização (PT, EN, ES)
- **Faker.js**: Geração de dados mockados
- **Node.js**: Backend service

## 🚀 Como usar

1. Clone o repositório
2. Execute `vtex link` no diretório do projeto
3. Acesse `/admin/email-sender` no admin da sua loja
4. Selecione um template de e-mail
5. Os dados mockados serão gerados automaticamente
6. Personalize o destinatário e assunto se necessário
7. Clique em "Enviar E-mail"

## 📱 Navegação

A aplicação adiciona uma nova seção no menu lateral do admin:
- **Exemplo Admin-UI** > **Envio de E-mails**

## 🔧 Estrutura do Projeto

```
├── admin/
│   ├── navigation.json    # Configuração do menu
│   └── routes.json       # Rotas da aplicação
├── react/
│   ├── EmailSender.tsx   # Componente principal
│   └── ...              # Outros componentes
├── node/
│   ├── index.ts         # Serviço backend
│   └── service.json     # Configuração das rotas
├── messages/
│   ├── pt.json          # Traduções em português
│   ├── en.json          # Traduções em inglês
│   └── es.json          # Traduções em espanhol
└── manifest.json        # Configuração da app
```

## 🌐 Internacionalização

A aplicação suporta 3 idiomas:
- 🇧🇷 Português (pt)
- 🇺🇸 Inglês (en)
- 🇪🇸 Espanhol (es)

## 🎯 Casos de Uso

- **Testes de e-mail**: Validar templates antes da produção
- **Demonstrações**: Mostrar diferentes tipos de e-mail para clientes
- **Desenvolvimento**: Testar integrações de e-mail sem dados reais
- **Treinamento**: Ensinar equipes sobre os e-mails da VTEX

## 📧 Como Receber os E-mails no Seu E-mail

Para testar e receber os e-mails no seu próprio e-mail, você precisa **editar o JSON** e alterar o campo de destinatário específico de cada template:

### 🔑 **Access Key (vtexid_check_email)**
- **Campo a alterar:** `to[0].email`
- **Referência no template:** `{{to.0.email}}`
- **Como fazer:** Clique em "Editar JSON" e altere:
```json
{
  "to": [
    {
      "name": "Seu Nome",
      "email": "seuemail@exemplo.com"
    }
  ]
}
```

### 🛒 **Confirmação de Pedido (vtexcommerce-new-order)**
- **Campo a alterar:** `orders[0].clientProfileData.email`
- **Referência no template:** `{{orders.0.clientProfileData.email}}`
- **Como fazer:** Clique em "Editar JSON" e altere:
```json
{
  "orders": [
    {
      "clientProfileData": {
        "email": "seuemail@exemplo.com"
      }
    }
  ]
}
```

### 🔍 **Como Descobrir o Campo de Qualquer Template**

1. **Acesse o template** em `/admin/message-center#/templates/{template-id}`
2. **Veja o campo "Destinatário"** na interface do template
3. **Identifique a variável** (ex: `{{to.0.email}}`, `{{clientProfileData.email}}`)
4. **Converta para o campo JSON:**
   - `{{to.0.email}}` → `to[0].email`
   - `{{orders.0.clientProfileData.email}}` → `orders[0].clientProfileData.email`
   - `{{userProfile.email}}` → `userProfile.email`

### 💡 **Dica Rápida**
- Use **"Template Customizado"** se quiser testar qualquer template VTEX
- **Edite o JSON** com seus dados pessoais para teste
- O campo de destinatário sempre segue o padrão mostrado no Message Center

---

## 📝 Como Adicionar Novos Templates

### 1. 🔍 Encontrar o Template no Message Center

1. Acesse `/admin/message-center#/templates` no seu admin VTEX
2. Procure por um template que ainda não foi mapeado na aplicação
3. Clique no template desejado
4. **Copie o ID do template** que aparece na URL

**Exemplo:**
- URL: `/admin/message-center#/templates/vtexid_check_email`
- **ID do template:** `vtexid_check_email`

### 2. 📋 Analisar a Estrutura de Dados

1. No Message Center, examine o **JSON de exemplo** fornecido pelo template
2. Identifique os campos obrigatórios e opcionais
3. Note os tipos de dados esperados (string, number, array, object)
4. Observe campos especiais como `to`, `_accountInfo`, etc.

### 3. 🛠️ Criar o Arquivo do Template

Crie um novo arquivo em `react/mocks/templates/` seguindo o padrão:

**Nome do arquivo:** `{template_id}.ts`

**Exemplo:** `vtex_payment_confirmation.ts`

### 4. 📁 Estrutura do Template

```typescript
import faker from 'faker'

// 1. Interface TypeScript para os dados do template
export interface PaymentConfirmationTemplateData {
    to: Array<{
        name: string
        email: string
    }>
    // Adicione todos os campos necessários aqui
    paymentData: {
        orderId: string
        amount: number
        // ... outros campos
    }
    _accountInfo: {
        // Estrutura padrão de conta VTEX
        MainAccountName: string
        AccountName: string
        // ... outros campos obrigatórios
    }
}

// 2. Função geradora de dados mockados
export const generatePaymentConfirmationMockData = (): PaymentConfirmationTemplateData => {
    return {
        to: [
            {
                name: faker.name.findName(),
                email: faker.internet.email()
            }
        ],
        paymentData: {
            orderId: faker.datatype.number({ min: 1000000, max: 9999999 }).toString(),
            amount: faker.datatype.number({ min: 100, max: 10000 })
        },
        _accountInfo: {
            MainAccountName: faker.internet.domainWord(),
            AccountName: faker.internet.domainWord(),
            // ... preencher todos os campos obrigatórios
        }
    }
}

// 3. Configuração do template
export const paymentConfirmationTemplate = {
    id: 'vtex-payment-confirmation', // ID exato do Message Center
    name: 'Payment Confirmation',
    friendlyName: 'Confirmação de Pagamento',
    description: 'Confirmação de pagamento processado com sucesso',
    category: 'Payment', // Categoria apropriada
    generateMockData: generatePaymentConfirmationMockData,

    // Subject dinâmico baseado nos dados
    generateSubject: (data: PaymentConfirmationTemplateData) => {
        return `Pagamento confirmado - Pedido #${data.paymentData.orderId}`
    },

    // Recipient padrão - adapte conforme o template
    getRecipient: (data: PaymentConfirmationTemplateData) => {
        // Use o campo apropriado para obter o email
        return data.to?.[0]?.email || data.customerEmail || ''
    }
}

export default paymentConfirmationTemplate
```

### 5. 📤 Registrar o Template

Adicione seu template no arquivo `react/mocks/templates/index.ts`:

```typescript
// Importar seu novo template
import paymentConfirmationTemplate from './vtex_payment_confirmation'

// Adicionar na lista de templates exportados
export const emailTemplates: EmailTemplate[] = [
    accessKeyTemplate,
    orderConfirmationTemplate,
    paymentConfirmationTemplate, // ← Adicionar aqui
    // Novos templates...
]
```

### 6. 🎨 Categorias Disponíveis

Use uma das categorias existentes ou crie uma nova:

- `Authentication` - Login, acesso, senhas
- `Commerce` - Pedidos, produtos, carrinho
- `Order` - Status de pedidos, confirmações
- `Payment` - Pagamentos, cobranças, faturas
- `Shipping` - Entrega, rastreamento, logística
- `Account` - Conta do usuário, perfil
- `Marketing` - Newsletters, promoções
- `System` - Notificações do sistema

### 7. 📋 Campos Obrigatórios Comuns

**Campo obrigatório:**
```typescript
// Informações da conta VTEX (sempre obrigatório)
_accountInfo: {
    MainAccountName: string
    AccountName: string
    Cnpj: string | null
    Id: string
    AppId: string | null
    IsActive: boolean
    IsOperating: boolean
    CreationDate: string
    OperationDate: string | null
    CompanyName: string
    TradingName: string
    // ... campos completos (veja exemplos existentes)
}
```

**Campo opcional (apenas alguns templates):**
```typescript
// Destinatário - apenas se o template usar este campo
to?: Array<{
    name: string
    email: string
}>
```

> **Nota:** Muitos templates VTEX não utilizam o campo `to` pois determinam o destinatário de outras formas (ex: do contexto do pedido, dados do usuário, etc.)

### 8. 💡 Dicas Importantes

- **Use Faker.js** para gerar dados realistas
- **Respeite os tipos** esperados pelo template original
- **Teste com dados variados** (null, empty arrays, etc.)
- **Mantenha consistência** com os templates existentes
- **Documente campos especiais** com comentários
- **Use nomes descritivos** para interfaces e funções

### 9. ✅ Templates já Implementados

- ✅ `vtexid_check_email` - Chave de Acesso
- ✅ `vtexcommerce-new-order` - Confirmação de Pedido

### 10. 🔄 Templates para Implementar

Alguns templates VTEX comuns que podem ser adicionados:

- `vtex-payment-approved` - Pagamento Aprovado
- `vtex-order-shipped` - Pedido Enviado
- `vtex-order-delivered` - Pedido Entregue
- `vtex-password-reset` - Reset de Senha
- `vtex-newsletter` - Newsletter
- `vtex-abandoned-cart` - Carrinho Abandonado
- `vtex-back-in-stock` - Produto em Estoque

### 11. 🤝 Contribuindo

1. **Fork** o repositório
2. **Crie** seu template seguindo este guia
3. **Teste** localmente com `vtex link`
4. **Abra um Pull Request** com:
   - Título descritivo: `feat: add template vtex-payment-confirmation`
   - Descrição explicando o template
   - Screenshots da aplicação funcionando

## 🛠️ Desenvolvimento Local

Para contribuir com o projeto ou fazer modificações:

### 1. Clone o repositório
```bash
git clone https://github.com/gabrielstc/admin-email-mock-sender.git
cd admin-email-mock-sender
```

### 2. Execute em modo de desenvolvimento
```bash
vtex link
```

### 3. Acesse a aplicação
- Admin: `https://seu-workspace--seu-account.myvtex.com/admin/`
- Aplicação: **Apps** → **Corebiz Email Mock Sender**

**Sua contribuição ajuda toda a comunidade VTEX! 🚀**
