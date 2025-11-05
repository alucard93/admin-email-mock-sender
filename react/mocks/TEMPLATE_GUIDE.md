# 📧 Guia de Criação de Templates

Este guia detalha como criar novos templates de e-mail para o **VTEX Email Mock Sender**.

## 🎯 Visão Geral

Cada template de e-mail é composto por:
- **Interface TypeScript** - Define a estrutura dos dados
- **Função geradora** - Cria dados mockados realistas
- **Configurações** - Metadados e funções auxiliares

## 📁 Estrutura de Arquivos

```
react/mocks/templates/
├── index.ts                     # Índice principal
├── vtexid_check_email.ts       # Template: Access Key
├── vtexcommerce_new_order.ts   # Template: Order Confirmation
└── seu_novo_template.ts        # Seu novo template
```

## 🔍 Encontrando Templates

### 1. Acesse o Message Center
```
https://seu-account.myvtex.com/admin/message-center#/templates
```

### 2. Identifique Templates Não Mapeados
- Procure templates que não estão na lista da aplicação
- Templates comuns: payment, shipping, account, marketing

### 3. Obtenha o ID do Template
- Clique no template desejado
- **Copie o ID da URL**

**Exemplos de URLs:**
```
/admin/message-center#/templates/vtexid_check_email
                                 ↑ ID: vtexid_check_email

/admin/message-center#/templates/vtex-payment-approved
                                 ↑ ID: vtex-payment-approved
```

## 🛠️ Implementação Passo a Passo

### Passo 1: Analisar Dados do Template

No Message Center, examine:
- **JSON Schema** - Estrutura esperada
- **Campos obrigatórios** vs opcionais
- **Tipos de dados** (string, number, array, object)
- **Campos especiais** (`to`, `_accountInfo`, etc.)

### Passo 2: Criar Interface TypeScript

```typescript
export interface SeuTemplateData {
    // Dados específicos do template
    templateSpecificData: {
        campo1: string
        campo2: number
        campo3?: boolean // opcional
    }
    
    // Destinatário (opcional - apenas alguns templates usam)
    to?: Array<{
        name: string
        email: string
    }>
    
    // Informações da conta (sempre obrigatório)
    _accountInfo: {
        MainAccountName: string
        AccountName: string
        // ... ver templates existentes para estrutura completa
    }
}
```

### Passo 3: Implementar Função Geradora

```typescript
import faker from 'faker'

export const generateSeuTemplateMockData = (): SeuTemplateData => {
    const accountName = faker.internet.domainWord()
    const companyName = faker.company.companyName()
    
    return {
        templateSpecificData: {
            campo1: faker.lorem.sentence(),
            campo2: faker.datatype.number({ min: 1, max: 1000 }),
            campo3: faker.datatype.boolean()
        },
        // to: opcional - apenas inclua se o template usar
        to: [
            {
                name: faker.name.findName(),
                email: faker.internet.email()
            }
        ],
        _accountInfo: {
            MainAccountName: accountName,
            AccountName: accountName,
            Cnpj: faker.datatype.boolean() ? 
                faker.datatype.number({ min: 10000000000000, max: 99999999999999 }).toString() : null,
            Id: faker.datatype.uuid(),
            AppId: null,
            IsActive: true,
            IsOperating: faker.datatype.boolean(),
            CreationDate: faker.date.past(2).toISOString(),
            OperationDate: null,
            CompanyName: companyName,
            TradingName: faker.company.catchPhrase(),
            City: faker.address.city(),
            Complement: null,
            Country: faker.address.country(),
            State: faker.address.state(),
            Address: faker.address.streetAddress(),
            District: faker.address.county(),
            Number: faker.datatype.number({ min: 1, max: 9999 }).toString(),
            PostalCode: faker.address.zipCode(),
            Licenses: [faker.datatype.number({ min: 1, max: 10 })],
            ParentAccountId: null,
            ParentAccountName: null,
            InactivationDate: null,
            Platform: 'vtex',
            Privacy: null,
            HasPiiRestriction: false,
            Infra: null,
            Sponsor: faker.datatype.uuid()
        }
    }
}
```

### Passo 4: Configurar o Template

```typescript
export const seuTemplate = {
    id: 'seu-template-id', // ID EXATO do Message Center
    name: 'Seu Template Nome',
    friendlyName: 'Nome Amigável do Template',
    description: 'Descrição do que o template faz',
    category: 'Payment', // Ver categorias disponíveis
    generateMockData: generateSeuTemplateMockData,

    // Subject dinâmico
    generateSubject: (data: SeuTemplateData) => {
        return `Assunto: ${data.templateSpecificData.campo1}`
    },

    // Recipient padrão - adapte conforme o template
    getRecipient: (data: SeuTemplateData) => {
        // Se usar campo 'to'
        if (data.to && data.to.length > 0) {
            return data.to[0].email
        }
        
        // Ou use outros campos específicos do template
        // Exemplos:
        // return data.clientProfileData?.email || ''  // Para templates de pedido
        // return data.userEmail || ''                 // Para templates de usuário
        // return data.customerData?.email || ''       // Para templates de cliente
        
        return '' // Fallback
    }
}

export default seuTemplate
```

### Passo 5: Registrar no Índice

Adicione em `templates/index.ts`:

```typescript
import seuTemplate from './seu_template_id'

export const emailTemplates: EmailTemplate[] = [
    accessKeyTemplate,
    orderConfirmationTemplate,
    seuTemplate, // ← Adicionar aqui
    // ...
]
```

## 📋 Campos Padrão da VTEX

### _accountInfo (Sempre Obrigatório)

```typescript
_accountInfo: {
    MainAccountName: string        // Nome da conta principal
    AccountName: string           // Nome da conta atual
    Cnpj: string | null          // CNPJ da empresa
    Id: string                   // UUID da conta
    AppId: string | null         // ID da aplicação
    IsActive: boolean            // Conta ativa?
    IsOperating: boolean         // Conta operando?
    CreationDate: string         // Data de criação (ISO)
    OperationDate: string | null // Data de operação (ISO)
    CompanyName: string          // Nome da empresa
    TradingName: string          // Nome fantasia
    City: string | null          // Cidade
    Complement: string | null    // Complemento do endereço
    Country: string | null       // País
    State: string | null         // Estado
    Address: string | null       // Endereço
    District: string | null      // Bairro
    Number: string | null        // Número
    PostalCode: string | null    // CEP
    Licenses: number[]           // Licenças
    ParentAccountId: string | null     // ID da conta pai
    ParentAccountName: string | null   // Nome da conta pai
    InactivationDate: string | null    // Data de inativação
    Platform: string             // Plataforma (sempre "vtex")
    Privacy: string | null       // Configurações de privacidade
    HasPiiRestriction: boolean   // Tem restrições PII?
    Infra: string | null         // Infraestrutura
    Sponsor: string              // UUID do sponsor
}
```

### to[] (Campo Opcional)

```typescript
to?: Array<{
    name: string    // Nome do destinatário
    email: string   // Email do destinatário
}>
```

**⚠️ Importante:** O campo `to` é **opcional** e usado apenas por alguns templates VTEX. Muitos templates determinam o destinatário através de:
- Dados do pedido (`clientProfileData.email`)
- Contexto do usuário logado
- Configurações do template no Message Center
- Outros campos específicos do template

**Quando incluir:**
- ✅ Se o template explicitamente usar o campo `to`
- ✅ Para templates de notificação geral
- ❌ Templates de pedido (usam email do cliente)
- ❌ Templates de conta (usam email do usuário)

### 📧 Como Determinar o Recipient

Diferentes templates usam diferentes formas de obter o email do destinatário:

```typescript
// Opção 1: Campo 'to' (poucos templates)
getRecipient: (data) => data.to?.[0]?.email || ''

// Opção 2: Email do cliente em pedidos
getRecipient: (data) => data.orders?.[0]?.clientProfileData?.email || ''

// Opção 3: Email direto em dados do usuário
getRecipient: (data) => data.clientProfileData?.email || ''

// Opção 4: Campos customizados
getRecipient: (data) => data.userEmail || data.customerEmail || ''

// Opção 5: Múltiplas fontes com fallback
getRecipient: (data) => {
    return data.to?.[0]?.email || 
           data.clientProfileData?.email || 
           data.userEmail || 
           ''
}
```

## 🎨 Categorias de Templates

| Categoria | Descrição | Exemplos |
|-----------|-----------|----------|
| `Authentication` | Login, acesso, autenticação | Access key, Password reset |
| `Commerce` | E-commerce geral | Catalog updates, Price changes |
| `Order` | Pedidos e status | Order confirmation, Order shipped |
| `Payment` | Pagamentos e cobrança | Payment approved, Invoice |
| `Shipping` | Entrega e logística | Shipped, Delivered, Tracking |
| `Account` | Conta do usuário | Profile updated, Account created |
| `Marketing` | Marketing e promoções | Newsletter, Abandoned cart |
| `System` | Notificações do sistema | System maintenance, Alerts |

## 💡 Boas Práticas

### 1. Use Faker.js Strategicamente

```typescript
// ✅ Bom - Dados realistas
email: faker.internet.email()
orderId: faker.datatype.number({ min: 1000000, max: 9999999 }).toString()
creationDate: faker.date.past(2).toISOString()

// ❌ Evitar - Dados muito genéricos
email: "test@test.com"
orderId: "123456"
```

### 2. Respeite Tipos de Dados

```typescript
// ✅ Bom - Tipos corretos
quantity: faker.datatype.number({ min: 1, max: 10 })        // number
price: faker.commerce.price()                               // string
isActive: faker.datatype.boolean()                         // boolean
creationDate: faker.date.past().toISOString()             // string ISO

// ❌ Evitar - Tipos incorretos
quantity: "5"           // deveria ser number
isActive: "true"        // deveria ser boolean
```

### 3. Valores Opcionais Realistas

```typescript
// ✅ Bom - Ocasionalmente null/undefined
complement: faker.datatype.boolean() ? faker.address.secondaryAddress() : null
appId: faker.datatype.boolean() ? faker.datatype.number().toString() : null

// ❌ Evitar - Sempre preenchido quando opcional
complement: faker.address.secondaryAddress() // sempre preenchido
```

### 4. Consistência de Dados

```typescript
// ✅ Bom - Dados relacionados consistentes
const accountName = faker.internet.domainWord()
const companyName = faker.company.companyName()

return {
    _accountInfo: {
        MainAccountName: accountName,
        AccountName: accountName,      // Mesmo valor
        CompanyName: companyName,
        TradingName: companyName + ' ' + faker.company.companySuffix()
    }
}
```

## 🧪 Testando Seu Template

### 1. Teste Local

```bash
cd seu-projeto
vtex link
```

### 2. Teste na Interface

1. Selecione seu novo template
2. Verifique se os dados são gerados corretamente
3. Teste o envio de e-mail
4. Valide o JSON gerado

### 3. Teste Edge Cases

- Campos opcionais como `null`
- Arrays vazios
- Valores extremos (min/max)
- Caracteres especiais

## 🚀 Contribuindo

### Pull Request Checklist

- [ ] Template segue a estrutura padrão
- [ ] Interface TypeScript completa
- [ ] Função geradora implementada
- [ ] Registrado no `index.ts`
- [ ] Testado localmente
- [ ] Documentação atualizada

### Formato do Commit

```
feat: add template vtex-payment-approved

- Implements payment approval notification template
- Includes realistic mock data generation
- Adds Payment category template
- Tests passed locally
```

## 📚 Referências

- [VTEX Message Center](https://help.vtex.com/tutorial/message-center--tutorials_84)
- [Faker.js Documentation](https://faker.readthedocs.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ❓ Precisa de Ajuda?

1. Verifique templates existentes como referência
2. Consulte a documentação da VTEX
3. Teste com dados reais do Message Center
4. Abra uma issue no GitHub para dúvidas específicas

---

## 📧 Testando com Seu E-mail

### Como Alterar o Destinatário

Para receber os e-mails de teste no seu próprio e-mail, identifique o campo correto no template:

#### 1. **Consulte o Message Center**
```
/admin/message-center#/templates/{template-id}
```

#### 2. **Veja o Campo "Destinatário"**
Exemplos comuns:
- `{{to.0.email}}` → Altere `to[0].email` no JSON
- `{{orders.0.clientProfileData.email}}` → Altere `orders[0].clientProfileData.email`
- `{{clientProfileData.email}}` → Altere `clientProfileData.email`
- `{{userProfile.email}}` → Altere `userProfile.email`

#### 3. **Edite o JSON na Aplicação**
```json
// Para templates com 'to'
{
  "to": [
    {
      "email": "seuemail@exemplo.com"
    }
  ]
}

// Para templates de pedido
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

---

**Contribua para crescer a biblioteca de templates! 🚀**