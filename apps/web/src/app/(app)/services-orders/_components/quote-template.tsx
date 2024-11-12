import { ServiceOrderQuoteComponentType, ServiceOrderQuoteType } from "./create-service-order-quote";

export default function QuoteTemplate(quote: ServiceOrderQuoteType) {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
      }}    
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #333",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Contrato de Ordem de Serviço</h1>
        <h2 style={{ textAlign: "center" }}>Serviços Eletrônicos</h2>

        {/* Seção: Informações do Cliente */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Informações do Cliente</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  Nome:
                </td>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                    {quote.clientName}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  CPF/CNPJ:
                </td>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  {quote.cpfCnpj}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  E-mail:
                </td>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                    {quote.email}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção: Descrição do Serviço */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Descrição do Serviço</h3>
          <p>[Descrição detalhada do serviço a ser prestado]</p>
        </div>

        {/* Seção: Valores e Pagamento */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Valores e Condições de Pagamento</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <tbody>
              <tr>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  Valor do Material:
                </td>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  R$ {quote.material_value}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  Valor da Mão de Obra:
                </td>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  R$ {quote.labor_value}
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  Valor Total:
                </td>
                <td style={{ border: "1px solid #333", padding: "8px" }}>
                  R$ {quote.whole_value}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção: Termos e Condições */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Termos e Condições</h3>
          <p>
            [Termos e condições detalhados, incluindo garantias, políticas de
            devolução, responsabilidades, etc.]
          </p>
        </div>

        {/* Seção: Assinaturas */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <p>_________________________</p>
          <p>Assinatura do Cliente</p>
          <p style={{ marginTop: "20px" }}>_________________________</p>
          <p>Assinatura do Prestador de Serviços</p>
        </div>
      </div>
    </div>
  );
}
