import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#eff6ff' },
  container: {
    flex: 1, width: '100%', maxWidth: 600,
    alignSelf: 'center', padding: 24,
  },
  titulo: { fontSize: 30, fontWeight: '700', color: '#1e293b', marginBottom: 8 },
  subtitulo: { fontSize: 16, color: '#64748b', marginBottom: 24 },
  label: { fontSize: 16, fontWeight: '600', color: '#1e293b', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 12,
    padding: 14, fontSize: 16, color: '#1e293b', backgroundColor: '#fff',
  },
  botao: {
    marginTop: 12, backgroundColor: '#2563eb', borderRadius: 12,
    minHeight: 48, padding: 14, alignItems: 'center', justifyContent: 'center',
  },
  botaoOpaco: { opacity: 0.5 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: '700' },
  resumo: { color: '#64748b', marginTop: 24, marginBottom: 12 },
  lista: { flex: 1 },
  conteudoLista: { paddingBottom: 24 },
  vazio: { color: '#64748b', textAlign: 'center', paddingVertical: 24 },
  erro: { color: '#b91c1c', marginBottom: 12 },
  tarefa: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    padding: 12, borderRadius: 12, marginBottom: 10,
    borderWidth: 1, borderColor: '#dbe4ef',
  },
  tarefaPrincipal: { flex: 1, flexDirection: 'row', alignItems: 'center', minHeight: 44 },
  marcador: { fontSize: 23, color: '#2563eb', marginRight: 12 },
  textoTarefa: { flex: 1, fontSize: 16, color: '#1e293b' },
  concluida: { textDecorationLine: 'line-through', color: '#64748b' },
  excluir: {
    marginLeft: 10, padding: 10, minHeight: 44,
    justifyContent: 'center', borderRadius: 8, backgroundColor: '#fee2e2',
  },
  textoExcluir: { color: '#b91c1c', fontWeight: '600' },
});