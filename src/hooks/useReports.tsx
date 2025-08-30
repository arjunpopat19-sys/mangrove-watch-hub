import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface IncidentReport {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  userId: string;
  userName: string;
  photo_url?: string;
  status: 'pending' | 'investigating' | 'resolved';
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface ReportsContextType {
  reports: IncidentReport[];
  loading: boolean;
  addReport: (report: Omit<IncidentReport, 'id' | 'timestamp' | 'userId' | 'userName'>) => Promise<boolean>;
  fetchReports: () => Promise<void>;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export const ReportsProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<IncidentReport[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('incident_reports')
        .select(`
          id,
          title,
          description,
          latitude,
          longitude,
          photo_url,
          status,
          severity,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch user profiles separately
      const userIds = [...new Set(data?.map(report => report.user_id) || [])];
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, first_name, last_name, email')
        .in('user_id', userIds);

      const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || []);

      const formattedReports = data?.map(report => {
        const profile = profileMap.get(report.user_id);
        return {
          id: report.id,
          title: report.title,
          description: report.description,
          latitude: Number(report.latitude),
          longitude: Number(report.longitude),
          timestamp: report.created_at,
          userId: report.user_id,
          userName: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email : 'Unknown User',
          photo_url: report.photo_url,
          status: report.status as any,
          severity: report.severity as any
        };
      }) || [];

      setReports(formattedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reports. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addReport = async (reportData: Omit<IncidentReport, 'id' | 'timestamp' | 'userId' | 'userName'>): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a report.",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { data, error } = await supabase
        .from('incident_reports')
        .insert([
          {
            title: reportData.title,
            description: reportData.description,
            latitude: reportData.latitude,
            longitude: reportData.longitude,
            photo_url: reportData.photo_url,
            status: reportData.status || 'pending',
            severity: reportData.severity || 'medium',
            user_id: user.id
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // Get user profile for the new report
      const { data: profile } = await supabase
        .from('profiles')
        .select('first_name, last_name, email')
        .eq('user_id', user.id)
        .single();

      const newReport: IncidentReport = {
        id: data.id,
        title: data.title,
        description: data.description,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        timestamp: data.created_at,
        userId: data.user_id,
        userName: profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email : user.email || 'Unknown User',
        photo_url: data.photo_url,
        status: data.status as any,
        severity: data.severity as any
      };

      setReports(prev => [newReport, ...prev]);

      toast({
        title: "Report submitted!",
        description: "Your incident report has been submitted successfully. You earned 10 points!",
      });

      return true;
    } catch (error) {
      console.error('Error adding report:', error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  return (
    <ReportsContext.Provider value={{
      reports,
      loading,
      addReport,
      fetchReports
    }}>
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};
