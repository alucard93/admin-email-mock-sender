import { useState, useCallback } from 'react'
import { useToast } from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import { messages } from '../messages'
import { MockData } from '../types'

export const useEmailSender = () => {
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const { formatMessage } = useIntl()

    const sendEmail = useCallback(async (
        selectedTemplate: string,
        customTemplateId: string,
        mockData: MockData | null
    ) => {
        if (!selectedTemplate || !mockData) {
            toast({
                message: 'Selecione um template e aguarde os dados carregarem',
            })
            return false
        }

        // Para template customizado, verificar se o ID foi fornecido
        if (selectedTemplate === 'custom' && !customTemplateId.trim()) {
            toast({
                message: 'Digite o ID do template customizado',
            })
            return false
        }

        setIsLoading(true)

        try {
            // Usar o customTemplateId se for template customizado, senão usar selectedTemplate
            const templateToUse = selectedTemplate === 'custom' ? customTemplateId : selectedTemplate

            const response = await fetch('/_v/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    templateName: templateToUse,
                    recipient: mockData.email || mockData.customerEmail || 'gabriel.strieder@corebiz.ag',
                    subject: mockData.subject || `Template: ${templateToUse}`,
                    mockData,
                }),
            })

            const result = await response.json()

            if (response.ok && result.success) {
                toast({
                    message: formatMessage(messages.success),
                })
                return true
            } else {
                toast({
                    message: result.message || formatMessage(messages.error),
                })
                return false
            }
        } catch (error) {
            console.error('Error sending email:', error)
            toast({
                message: formatMessage(messages.error),
            })
            return false
        } finally {
            setIsLoading(false)
        }
    }, [toast, formatMessage])

    return {
        isLoading,
        sendEmail
    }
}